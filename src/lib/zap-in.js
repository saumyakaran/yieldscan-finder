import { FixedPointNumber } from "@acala-network/sdk-core"
import { web3FromAddress } from "@polkadot/extension-dapp"
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto"
import { get } from "lodash"

const zapIn = async ({ account, swapTxData, addLiquidityTxData }, api) => {
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

	await api.tx.utility.batchAll(batchedTx).signAndSend(sender)
}

export default zapIn
