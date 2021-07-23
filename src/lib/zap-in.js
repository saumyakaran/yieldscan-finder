import { FixedPointNumber } from "@acala-network/sdk-core"
import { web3FromAddress } from "@polkadot/extension-dapp"
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto"
import { get, isNil } from "lodash"

const createEventInstance = (message, ...params) => ({ message, ...params })

const zapIn = async (
	{ account, swapTxData, addLiquidityTxData },
	api,
	{ onEvent, onFinish, onSuccessfullSigning }
) => {
	const {
		lpTokenA,
		lpTokenB,
		maxLiquidityA,
		maxLiquidityB,
		withStake,
	} = addLiquidityTxData

	const sender = encodeAddress(decodeAddress(account), 42)
	const injector = await web3FromAddress(sender)
	api.setSigner(injector.signer)

	const batchedTx = []

	const swapParams = swapTxData[0].toChainData()
	const swapTx = api.tx.dex.swapWithExactSupply(
		swapParams[0],
		swapParams[1],
		new FixedPointNumber(
			swapTxData[0].output.balance.toNumber() * (1 - 0.001),
			swapTxData[0].output.token.decimal
		).toChainData()
	)

	batchedTx.push(swapTx)

	if (swapTxData[1]) {
		const _swapParams = swapTxData[1].toChainData()
		const swapTx2 = api.tx.dex.swapWithExactSupply(
			_swapParams[0],
			_swapParams[1],
			new FixedPointNumber(
				swapTxData[1].output.balance.toNumber() * (1 - 0.001),
				swapTxData[1].output.token.decimal
			).toChainData()
		)
		batchedTx.push(swapTx2)
	}

	const addLiquidityTx = api.tx.dex.addLiquidity(
		{ Token: get(lpTokenA, "name") },
		{ Token: get(lpTokenB, "name") },
		maxLiquidityA.toChainData(),
		maxLiquidityB.toChainData(),
		withStake
	)

	batchedTx.push(addLiquidityTx)

	return api.tx.utility
		.batchAll(batchedTx)
		.signAndSend(sender, ({ events = [], status }) => {
			onEvent(
				createEventInstance("Waiting for your to sign the transaction...")
			)
			if (status.isInBlock) {
				onEvent(
					createEventInstance(`Included in block : ${status.asInBlock}...`)
				)
				onSuccessfullSigning(createEventInstance(`${status.asInBlock}`))
			}

			if (status.isFinalized) {
				const txHash = status.asFinalized.toString()
				console.info("transaction hash: " + txHash)
				let failed = false
				events.forEach((d) => {
					const {
						event: { method },
					} = d
					if (method === "BatchInterrupted" || "ExtrinsicFailed") {
						failed = true
					}
				})

				const eventLogs = events.map((d) => {
					const {
						phase,
						event: { data, method, section },
					} = d
					return `${phase}: ${section}.${method}:: ${data}`
				})

				console.log(eventLogs)

				onFinish(
					failed ? 1 : 0,
					failed
						? "Transaction failed due to unknown reason"
						: "Added liquidity",
					eventLogs,
					isNil(txHash) ? "N/A" : txHash
				)
			}
		})
}

export default zapIn
