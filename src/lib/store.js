import create from "zustand"
import { getNetworkInfo } from "../app.config"

const useSelectedNetwork = create((set) => ({
	selectedNetwork: getNetworkInfo("Acala Mandala"),
	setSelectedNetwork: (selectedNetwork) => set(() => ({ selectedNetwork })),
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
	setApiInstance: (apiInstance) => set(() => ({ apiInstance })),
}))

export {
	useAccounts,
	useWalletConnectionState,
	useSelectedNetwork,
	usePolkadotApi,
}
