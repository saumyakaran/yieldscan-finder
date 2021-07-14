import { WsProvider, ApiPromise } from "@polkadot/api"

const createPolkadotAPIInstance = async (networkInfo, apiInstance) => {
	if (apiInstance) {
		console.info("Polkadot api instance aleady exists.")
		return apiInstance
	}
	const wsURL = networkInfo.nodeWs
	const provider = new WsProvider(wsURL)
	const api = await ApiPromise.create({ provider: provider })

	return api
}

export default createPolkadotAPIInstance
