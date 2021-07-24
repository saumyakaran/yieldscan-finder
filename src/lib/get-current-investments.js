import { map } from "lodash"

const getCurrentInvestments = async ({
	accountId,
	liquidityPools,
	walletInstance,
}) => {
	// const currentInvestments = await walletInstance.queryBalance(accountId, "KAR")
	// console.log(currentInvestments)
	return map(liquidityPools, (pool) => ({ pool, value: 100 })).slice(0,2)
}

export default getCurrentInvestments
