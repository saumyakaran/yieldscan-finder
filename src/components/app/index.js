import React, { useEffect } from "react"
import {
	Box,
	Heading,
	HStack,
	Stack,
	Text,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react"
import { Fragment } from "react"
import {
	useAccounts,
	useLiquidityPools,
	usePolkadotApi,
	useSelectedNetwork,
	useSelectedPool,
	useSwapRx,
	useTokens,
	useWalletPromise,
} from "../../lib/store"
import createPolkadotAPIInstance from "../../lib/polkadot-api"
import getLiquidityPools from "../../lib/get-liquidity-pools"
import { get, isNil } from "lodash"
import AddLiquidityModal from "./explore-table/add-liquidity-modal"
import createPolkadotAPIRxInstance from "../../lib/polkadot-api-rx"
import getAllTokens from "../../lib/get-all-tokens"
import createWalletPromise from "../../lib/wallet-promise"
import createSwapRx from "../../lib/swap-rx"
import NetworkInput from "./network-input"
import ExploreTable from "./explore-table"
import CurrentInvestmentsTable from "./current-investments-table"

const AppComponent = () => {
	const { colorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		apiInstance,
		apiRxInstance,
		setApiRxInstance,
		setApiInstance,
	} = usePolkadotApi()
	const { selectedNetwork } = useSelectedNetwork()
	const { setSelectedPool } = useSelectedPool()
	const { liquidityPools, setLiquidityPools } = useLiquidityPools()
	const { walletInstance, setWalletInstance } = useWalletPromise()
	const { setSwapRx } = useSwapRx()
	const { setTokens } = useTokens()
	const { selectedAccount } = useAccounts()

	const handleInvest = (pool) => {
		setSelectedPool(pool)
		onOpen()
	}

	useEffect(() => {
		if (!apiInstance) {
			createPolkadotAPIInstance(selectedNetwork, apiInstance).then((api) => {
				setApiInstance(api)
			})
		}
	}, [apiInstance, selectedNetwork, setApiInstance])

	useEffect(() => {
		if (!apiRxInstance) {
			createPolkadotAPIRxInstance(selectedNetwork, apiRxInstance).then(
				(api) => {
					setApiRxInstance(api)
				}
			)
		}
	}, [apiRxInstance, selectedNetwork, setApiRxInstance])

	useEffect(() => {
		let mounted = true
		getLiquidityPools(apiInstance).then((pools) => {
			if (mounted) setLiquidityPools(pools)
		})
		return () => {
			mounted = false
		}
	}, [apiInstance, setLiquidityPools])

	useEffect(() => {
		let mounted = true
		getAllTokens(walletInstance).then((tokens) => {
			if (mounted) {
				setTokens(tokens)
			}
		})
		return () => {
			mounted = false
		}
	}, [walletInstance, setTokens])

	useEffect(() => {
		let mounted = true
		if (!walletInstance && apiInstance) {
			console.info("creating wallet instance...")
			createWalletPromise(apiInstance, walletInstance).then((wallet) => {
				if (mounted) setWalletInstance(wallet)
			})
		}
		return () => {
			mounted = false
		}
	}, [apiInstance, walletInstance, setWalletInstance])

	useEffect(() => {
		if (
			get(apiInstance, "runtimeChain") &&
			get(walletInstance, "runtimeChain") &&
			!isNil(walletInstance)
		) {
			apiInstance.runtimeChain.toString() !== walletInstance.runtimeChain &&
				setWalletInstance(null)
		}
	}, [apiInstance, setWalletInstance, walletInstance])

	useEffect(() => {
		let mounted = true
		if (!isNil(apiRxInstance) && mounted) {
			setSwapRx(createSwapRx(apiRxInstance))
		}
		return () => {
			mounted = false
		}
	}, [apiRxInstance, setSwapRx])

	return (
		<Fragment>
			{!isNil(selectedAccount) && (
				<Fragment>
					<HStack justify="space-between">
						<Stack my={8} w="full">
							<Heading as="h1" size="lg">
								Current investments
							</Heading>
						</Stack>
						<NetworkInput />
					</HStack>
					<Box
						border="1px"
						borderColor={colorMode === "dark" ? "gray.700" : "gray.100"}
						borderRadius="0.75rem"
						py={2}
					>
						<CurrentInvestmentsTable />
					</Box>
				</Fragment>
			)}
			<HStack justify="space-between">
				<Stack my={8} w="full">
					<Heading as="h1" size="lg">
						Explore opportunities
					</Heading>
					<Text>Add liquidity to earn fees and incentives</Text>
				</Stack>
				{isNil(selectedAccount) && <NetworkInput />}
			</HStack>
			<Box
				border="1px"
				borderColor={colorMode === "dark" ? "gray.700" : "gray.100"}
				borderRadius="0.75rem"
				py={2}
			>
				<ExploreTable
					liquidityPools={liquidityPools}
					handleInvest={handleInvest}
				/>
			</Box>
			{isOpen && <AddLiquidityModal isOpen={isOpen} onClose={onClose} />}
		</Fragment>
	)
}

export default AppComponent
