import create from "zustand"
import { getNetworkInfo } from "../app.config"

const useSelectedNetwork = create((set) => ({
	selectedNetwork: getNetworkInfo("Acala Mandala"),
	setSelectedNetwork: (selectedNetwork) => set(() => ({ selectedNetwork })),
}))

const useSelectedPool = create((set) => ({
	selectedPool: null,
	setSelectedPool: (selectedPool) => set(() => ({ selectedPool })),
}))

const useInputToken = create((set) => ({
	inputToken: null,
	setInputToken: (inputToken) => set(() => ({ inputToken })),
}))

const useInputAmount = create((set) => ({
	inputAmount: null,
	setInputAmount: (inputAmount) => set(() => ({ inputAmount })),
}))

const useAccounts = create((set) => ({
	accounts: null,
	selectedAccount: null,
	setAccounts: (newAccounts) => set(() => ({ accounts: newAccounts })),
	setSelectedAccount: (selectedAccount) => set(() => ({ selectedAccount })),
}))

const useWalletConnectionState = create((set) => ({
	isWalletConnected: false,
	setIsWalletConnected: (connectionState) =>
		set(() => ({ isWalletConnected: connectionState })),
}))

const useSwap1 = create((set) => ({
	swapTarget1: null,
	swapAmount1: null,
	minTargetAmount1: null,
	// inputToken1: { Token: "ACA" },
	// swapTarget1: { Token: "aUSD" },
	// swapAmount1: 10000000000000,
	// minTargetAmount1: 24576540636098,
	setSwapTarget1: (swapTarget1) => set(() => ({ swapTarget1 })),
	setSwapAmount1: (swapAmount1) => set(() => ({ swapAmount1 })),
	setMinTargetAmount1: (minTargetAmount1) => set(() => ({ minTargetAmount1 })),
}))

const useSwap2 = create((set) => ({
	swapTarget2: null,
	swapAmount2: null,
	minTargetAmount2: null,
	// inputToken2: { Token: "ACA" },
	// swapTarget2: { Token: "aUSD" },
	// swapAmount2: 10000000000000,
	// minTargetAmount2: 24576540636098,
	setSwapTarget2: (swapTarget2) => set(() => ({ swapTarget2 })),
	setSwapAmount2: (swapAmount2) => set(() => ({ swapAmount2 })),
	setMinTargetAmount2: (minTargetAmount2) => set(() => ({ minTargetAmount2 })),
}))

const usePolkadotApi = create((set) => ({
	apiInstance: null,
	apiRxInstance: null,
	setApiInstance: (apiInstance) => set(() => ({ apiInstance })),
	setApiRxInstance: (apiRxInstance) => set(() => ({ apiRxInstance })),
}))

const useWalletPromise = create((set) => ({
	walletInstance: null,
	setWalletInstance: (walletInstance) => set(() => ({ walletInstance })),
}))

const useSwapRx = create((set) => ({
	swapRx: null,
	setSwapRx: (swapRx) => set(() => ({ swapRx })),
}))

const useAddLiquidity = create((set) => ({
	lpTokenA: null,
	lpTokenB: null,
	maxLiquidityA: null,
	maxLiquidityB: null,
	// lpTokenA: { Token: "ACA" },
	// lpTokenB: { Token: "aUSD" },
	// maxLiquidityA: 10000000000000,
	// maxLiquidityB: 24576540636098,

	withStake: true,
	setLpTokenA: (lpTokenA) => set(() => ({ lpTokenA })),
	setLpTokenB: (lpTokenB) => set(() => ({ lpTokenB })),
	setMaxLiquidityA: (maxLiquidityA) => set(() => ({ maxLiquidityA })),
	setMaxLiquidityB: (maxLiquidityB) => set(() => ({ maxLiquidityB })),
	setWithStake: (withStake) => set(() => ({ withStake })),
}))

const useLiquidityPools = create((set) => ({
	liquidityPools: null,
	setLiquidityPools: (lp) => set(() => ({ liquidityPools: lp })),
}))

const useTokens = create((set) => ({
	tokens: null,
	setTokens: (tokens) => set(() => ({ tokens: tokens })),
}))

export {
	useAccounts,
	useSelectedPool,
	useInputToken,
	useInputAmount,
	useWalletConnectionState,
	useSelectedNetwork,
	usePolkadotApi,
	useWalletPromise,
	useSwap1,
	useSwap2,
	useSwapRx,
	useAddLiquidity,
	useLiquidityPools,
	useTokens,
}
