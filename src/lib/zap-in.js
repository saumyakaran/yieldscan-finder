import { web3FromAddress } from "@polkadot/extension-dapp"
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto"

const zapIn = async ({ account, swapTxData, addLiquidityTxData }, api) => {
	const { path, supplyAmount, minTargetAmount1 } = swapTxData
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

	const swapTx = api.tx.dex.swapWithExactSupply(
		path,
		supplyAmount,
		minTargetAmount1
	)
	const addLiquidityTx = api.tx.dex.addLiquidity(
		lpTokenA,
		lpTokenB,
		maxLiquidityA,
		maxLiquidityB,
		withStake
	)

	const batchedTx = [swapTx, addLiquidityTx]

	console.log("swapTx")
	console.log(swapTx)
	console.log("addLiquidityTx")
	console.log(addLiquidityTx)

	// await api.tx.utility.batchAll(batchedTx).signAndSend(sender)
}

export default zapIn
