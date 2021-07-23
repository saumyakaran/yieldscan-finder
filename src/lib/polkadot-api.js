import { ApiPromise } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"
import { options } from "@acala-network/api"

const createPolkadotAPIInstance = async (networkInfo, apiInstance) => {
	if (apiInstance) {
		console.info("Polkadot api instance aleady exists.")
		return apiInstance
	}
	const wsURL = networkInfo.nodeWs
	const provider = new WsProvider(wsURL)
	const api = new ApiPromise(options({ provider }))

	await api.isReady

	return api
}

export default createPolkadotAPIInstance
