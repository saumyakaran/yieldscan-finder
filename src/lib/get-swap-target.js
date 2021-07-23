import { isEqual } from "lodash"

const getSwapTarget = ({ inputToken, selectedPool }, walletInstance) => {
	const token1 = walletInstance.getToken(selectedPool.pool[0].token)
	const token2 = walletInstance.getToken(selectedPool.pool[1].token)
	const swapTarget = []

	if (isEqual(inputToken, token1)) {
		swapTarget.push(token2)
	} else if (isEqual(inputToken, token2)) {
		swapTarget.push(token1)
	} else {
		swapTarget.push(token1, token2)
	}

	return swapTarget
}

export default getSwapTarget
