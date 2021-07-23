import { ApiRx } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"
import { options } from "@acala-network/api"

const createPolkadotAPIRxInstance = async (networkInfo, apiInstance) => {
	if (apiInstance) {
		console.info("Polkadot api rx instance aleady exists.")
		return apiInstance
	}
	const wsURL = networkInfo.nodeWs
	const provider = new WsProvider(wsURL)
	const api = ApiRx.create(options({ provider })).toPromise()

	await api.isReady

	return api
}

export default createPolkadotAPIRxInstance
