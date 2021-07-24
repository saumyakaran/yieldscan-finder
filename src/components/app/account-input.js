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
import Identicon from "@polkadot/react-identicon"
import { find, get, map } from "lodash"
import React, { useEffect } from "react"
import getCurrentInvestments from "../../lib/get-current-investments"
import {
	useAccounts,
	useCurrentInvestments,
	useLiquidityPools,
	useWalletPromise,
} from "../../lib/store"

const DisplayButton = ({ account, onOpen }) => (
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
			{get(account, "address") && (
				<Box mr={2} mb={-2}>
					<Identicon
						size={32}
						value={get(account, "address")}
						theme="polkadot"
					/>
				</Box>
			)}
			<Text display="inline" pr={4} isTruncated>
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
	const { setCurrentInvestments } = useCurrentInvestments()
	const { liquidityPools } = useLiquidityPools()
	const { walletInstance } = useWalletPromise()

	const accountHandler = (account) => {
		setSelectedAccount(find(accounts, (acc) => get(acc, "address") === account))
		onClose()
	}

	useEffect(() => {
		let mounted = true
		if (mounted && selectedAccount && walletInstance && liquidityPools)
			getCurrentInvestments({
				accountId: get(selectedAccount, "address"),
				liquidityPools,
				walletInstance,
			}).then((investments) => setCurrentInvestments(investments))

		return () => {
			mounted = false
		}
	}, [liquidityPools, setCurrentInvestments, walletInstance, selectedAccount])

	return (
		<FormControl>
			<Menu w="xs" isOpen={isOpen} onClose={onClose}>
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
