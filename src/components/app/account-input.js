import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
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
import Identicon from "@polkadot/react-identicon"
import { find, get, map } from "lodash"
import React from "react"
import { useAccounts } from "../../lib/store"

const DisplayButton = ({ account, onOpen }) => (
	<MenuButton
		as={Button}
		onClick={onOpen}
		w="full"
		fontSize="lg"
		textAlign="left"
		fontWeight="normal"
		rightIcon={<ChevronDownIcon />}
		py={8}
	>
		<Box as="span" w="full" display="flex" alignItems="center">
			{get(account, "address") && (
				<Box mr={2} mb={-2}>
					<Identicon
						size={32}
						value={get(account, "address")}
						theme="polkadot"
					/>
				</Box>
			)}
			<Text display="inline">
				{account
					? get(account, "meta.name") + " - " + get(account, "address")
					: "Select your account"}
			</Text>
		</Box>
	</MenuButton>
)

const AccountInput = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { accounts, selectedAccount, setSelectedAccount } = useAccounts()

	const accountHandler = (account) => {
		setSelectedAccount(find(accounts, (acc) => get(acc, "address") === account))
		onClose()
	}

	return (
		<FormControl>
			<FormLabel>Account</FormLabel>
			<Menu w="full" isOpen={isOpen} onClose={onClose}>
				<DisplayButton onOpen={onOpen} account={selectedAccount} />
				<MenuList>
					<MenuOptionGroup
						type="radio"
						value={get(selectedAccount, "address")}
						onChange={accountHandler}
					>
						{map(accounts, (account) => (
							<MenuItemOption
								key={get(account, "address")}
								value={get(account, "address")}
							>
								<Box display="flex" alignItems="center">
									<Box mr={2} mb={-2}>
										<Identicon
											size={32}
											value={get(account, "address")}
											theme="polkadot"
										/>
									</Box>
									<Text display="inline">
										{get(account, "meta.name")} - {get(account, "address")}
									</Text>
								</Box>
							</MenuItemOption>
						))}
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</FormControl>
	)
}

export default AccountInput
