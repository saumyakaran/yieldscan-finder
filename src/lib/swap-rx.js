import { SwapRx } from "@acala-network/sdk-swap"

const createSwapRx = (apiRxInstance) => {
	const swapRx = new SwapRx(apiRxInstance)
	return swapRx
}

export default createSwapRx