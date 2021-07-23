import { WalletPromise } from "@acala-network/sdk-wallet"

const createWalletPromise = async (api, walletInstance) => {
	if (walletInstance) {
		console.info("Wallet instance aleady exists.")
		return walletInstance
	}

	const wallet = new WalletPromise(api)
	wallet.init()
	await wallet.isReady

	return wallet
}

export default createWalletPromise
