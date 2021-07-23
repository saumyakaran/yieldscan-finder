import React, { useEffect } from "react"
import { Box, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { Fragment } from "react"
import ConnectWalletButton from "./wallet-connection/connect-wallet-button"
import {
	useLiquidityPools,
	usePolkadotApi,
	useSelectedNetwork,
	useSelectedPool,
	useSwapRx,
	useTokens,
	useWalletConnectionState,
	useWalletPromise,
} from "../../lib/store"
import AccountInput from "./account-input"
import createPolkadotAPIInstance from "../../lib/polkadot-api"
import getLiquidityPools from "../../lib/get-liquidity-pools"
import { get, isNil, map } from "lodash"
import AddLiquidityModal from "./invest/add-liquidity-modal"
import createPolkadotAPIRxInstance from "../../lib/polkadot-api-rx"
import getAllTokens from "../../lib/get-all-tokens"
import createWalletPromise from "../../lib/wallet-promise"
import createSwapRx from "../../lib/swap-rx"

const AppComponent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		apiInstance,
		apiRxInstance,
		setApiRxInstance,
		setApiInstance,
	} = usePolkadotApi()
	const { isWalletConnected } = useWalletConnectionState()
	const { selectedNetwork } = useSelectedNetwork()
	const { setSelectedPool } = useSelectedPool()
	const { liquidityPools, setLiquidityPools } = useLiquidityPools()
	const { walletInstance, setWalletInstance } = useWalletPromise()
	const { setSwapRx } = useSwapRx()
	const { setTokens } = useTokens()

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
			createWalletPromise(apiInstance, walletInstance).then((wallet) => {
				if (mounted) setWalletInstance(wallet)
			})
		}
		return () => {
			mounted = false
		}
	}, [apiInstance, walletInstance, setWalletInstance])

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
			<Stack my={8}>
				<Heading as="h1">Explore opportunities</Heading>
				<Text>Add liquidity to earn fees and incentives</Text>
			</Stack>
			<Stack>
				{map(liquidityPools, (pool) => (
					<Text key={get(pool, "id")} onClick={() => handleInvest(pool)}>
						{get(pool, "id[0]")}/{get(pool, "id[1]")}
					</Text>
				))}
			</Stack>
			<Box mt={12}>
				{isWalletConnected ? <AccountInput /> : <ConnectWalletButton />}
			</Box>
			{isOpen && <AddLiquidityModal isOpen={isOpen} onClose={onClose} />}
		</Fragment>
	)
}

export default AppComponent
