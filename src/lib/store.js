import create from "zustand"
import { getNetworkInfo } from "../app.config"

const useSelectedNetwork = create((set) => ({
	selectedNetwork: getNetworkInfo("Karura"),
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
	useSwapRx,
	useLiquidityPools,
	useTokens,
}
