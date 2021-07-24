import { Button } from "@chakra-ui/button"
import { FormControl } from "@chakra-ui/form-control"
import { useDisclosure } from "@chakra-ui/hooks"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Box, Text } from "@chakra-ui/layout"
import {
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from "@chakra-ui/menu"
import { Avatar } from "@chakra-ui/react"
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto"
import { get, map } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import { getNetworkInfo } from "../../app.config"
import getWallet from "../../lib/polkadot-extension"
import {
	useAccounts,
	useCurrentInvestments,
	usePolkadotApi,
	useSelectedNetwork,
	useWalletConnectionState,
	useWalletPromise,
} from "../../lib/store"

const DisplayButton = ({ selectedNetwork, onOpen }) => (
	<MenuButton
		as={Button}
		onClick={onOpen}
		w="xs"
		textAlign="left"
		fontWeight="normal"
		rightIcon={<ChevronDownIcon />}
		py={6}
	>
		<Box as="span" w="full" display="flex" alignItems="center">
			{get(selectedNetwork, "name") && (
				<Avatar name={get(selectedNetwork, "name")} mr={2} size="sm" />
			)}
			<Text display="inline" pr={4} isTruncated>
				{selectedNetwork ? get(selectedNetwork, "name") : "Select a network"}
			</Text>
		</Box>
	</MenuButton>
)

const NetworkInput = () => {
	const networks = [getNetworkInfo("Karura"), getNetworkInfo("Acala Mandala")]
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { selectedNetwork, setSelectedNetwork } = useSelectedNetwork()
	const { setWalletInstance } = useWalletPromise()
	const { setAccounts, setSelectedAccount } = useAccounts()
	const { isWalletConnected } = useWalletConnectionState()
	const { setCurrentInvestments } = useCurrentInvestments()
	// eslint-disable-next-line
	const [extensionEvent, setExtensionEvent] = useState()

	const { setApiRxInstance, setApiInstance } = usePolkadotApi()

	const clearAll = () => {
		setApiInstance(null)
		setApiRxInstance(null)
		setWalletInstance(null)
		setAccounts(null)
		setSelectedAccount(null)
		setCurrentInvestments(null)
	}

	const networkHandler = (network) => {
		clearAll()
		setSelectedNetwork(getNetworkInfo(network))

		onClose()
	}

	const walletEventHandler = useMemo(
		() => ({
			onEvent: (eventInfo) => {
				setExtensionEvent(eventInfo.message)
			},
		}),
		[setExtensionEvent]
	)

	useEffect(() => {
		let isMounted = true
		if (isWalletConnected)
			getWallet(walletEventHandler)
				.then(({ isExtensionAvailable, accounts = [] }) => {
					if (isMounted) {
						if (isExtensionAvailable) {
							if (accounts.length) {
								accounts.forEach((x) => {
									x.address = encodeAddress(
										decodeAddress(x.address.toString()),
										get(selectedNetwork, "addressPrefix")
									)
								})
								setAccounts(accounts)
							}
						}
					}
				})
				.catch((error) => {
					console.error(error)
				})
		return () => {
			isMounted = false
		}
	}, [selectedNetwork, setAccounts, isWalletConnected, walletEventHandler])

	return (
		<FormControl w="auto">
			<Menu w="xs" isOpen={isOpen} onClose={onClose}>
				<DisplayButton onOpen={onOpen} selectedNetwork={selectedNetwork} />
				<MenuList>
					<MenuOptionGroup
						type="radio"
						value={get(selectedNetwork, "name")}
						onChange={networkHandler}
					>
						{map(networks, (network) => (
							<MenuItemOption
								key={get(network, "id")}
								value={get(network, "name")}
							>
								<Box display="flex" alignItems="center">
									<Avatar name={get(network, "name")} mr={2} size="sm" />
									<Text display="inline">{get(network, "name")}</Text>
								</Box>
							</MenuItemOption>
						))}
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</FormControl>
	)
}

export default NetworkInput
