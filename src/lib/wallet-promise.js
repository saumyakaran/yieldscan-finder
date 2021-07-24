import { WalletPromise } from "@acala-network/sdk-wallet"

const createWalletPromise = async (api, walletInstance) => {
	if (walletInstance) {
		console.info("Wallet instance aleady exists.")
		return walletInstance
	}

	const wallet = new WalletPromise(api)
	wallet.init()
	await wallet.isReady

	// console.log(
	// 	(
	// 		await wallet.queryBalance(
	// 			"5GYkHEfNxG6UVWrRHU2oKECcYmiW1oqZifrDvFzDC3iRnQF5",
	// 			{ dexShare: ["ACA", "AUSD"] }
	// 		)
	// 	)
	// )
	// console.log(
	// 	(
	// 		await wallet.queryBalance(
	// 			"5GYkHEfNxG6UVWrRHU2oKECcYmiW1oqZifrDvFzDC3iRnQF5",
	// 			{ dexShare: ["ACA", "AUSD"] }
	// 		)
	// 	).availableBalance.toChainData()/10**12
	// )

	return wallet
}

export default createWalletPromise
