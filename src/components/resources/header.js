import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react"
import { CgDarkMode } from "react-icons/cg"

import React from "react"
import { useWalletConnectionState } from "../../lib/store"
import AccountInput from "../app/account-input"
import ConnectWalletButton from "../app/wallet-connection/connect-wallet-button"

const Header = () => {
	const { toggleColorMode } = useColorMode()
	const { isWalletConnected } = useWalletConnectionState()
	return (
		<header>
			<Flex
				maxW="960px"
				mx="auto"
				alignItems="center"
				justifyContent="flex-end"
				py={4}
			>
				<Box mr={8}>
					{isWalletConnected ? <AccountInput /> : <ConnectWalletButton />}
				</Box>
				<IconButton
					icon={<CgDarkMode size="40px" />}
					onClick={toggleColorMode}
					cursor="pointer"
					background="none"
					rounded="4rem"
				/>
			</Flex>
		</header>
	)
}

export default Header
