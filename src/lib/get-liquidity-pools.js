import { filter, map } from "lodash"
import { assert } from "@polkadot/util"

const getLiquidityPools = async (api) => {
	let pools
	if (api) {
		console.info("api found, fetching pools")
		const _filterFn = (status) => status.isEnabled
		const poolData = await api.query.dex.tradingPairStatuses.entries()
		const filteredData = filter(poolData, (item) => _filterFn(item[1]))
		pools = map(filteredData, (item) =>
			fromCurrencies(item[0].args[0][0], item[0].args[0][1])
		)
	}
	return pools
}

const fromCurrencies = (currency1, currency2) => {
	assert(
		currency1.isToken && currency2.isToken,
		"TokenPair.fromCurrenciesArray should receive CurrencyId which is TokenSymbol"
	)

	const _currency1 = currency1.toJSON()
	const _currency2 = currency2.toJSON()

	return {
		id: [_currency1.token, _currency2.token],
		pool: [_currency1, _currency2],
	}
}

export default getLiquidityPools
