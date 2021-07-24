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
import { get, map } from "lodash"
import React from "react"
import { getNetworkInfo } from "../../app.config"
import {
	usePolkadotApi,
	useSelectedNetwork,
	useWalletPromise,
} from "../../lib/store"

const DisplayButton = ({ selectedNetwork, onOpen }) => (
	<MenuButton
		as={Button}
		onClick={onOpen}
		w="xs"
		fontSize="lg"
		textAlign="left"
		fontWeight="normal"
		rightIcon={<ChevronDownIcon />}
		py={8}
	>
		<Box as="span" w="full" display="flex" alignItems="center">
			{get(selectedNetwork, "name") && (
				<Avatar name={get(selectedNetwork, "name")} mr={2} />
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

	const { setApiRxInstance, setApiInstance } = usePolkadotApi()

	const clearAll = () => {
		setApiInstance(null)
		setApiRxInstance(null)
		setWalletInstance(null)
	}

	const networkHandler = (network) => {
		clearAll()
		setSelectedNetwork(getNetworkInfo(network))

		onClose()
	}

	return (
		<FormControl>
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
									<Avatar name={get(network, "name")} mr={2} />
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
