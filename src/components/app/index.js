import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import { Fragment } from "react"
import ConnectWalletButton from "./wallet-connection/connect-wallet-button"
import { useWalletConnectionState } from "../../lib/store"
import AccountInput from "./account-input"
import { appName } from "../../app.config"

const AppComponent = () => {
	const { isWalletConnected } = useWalletConnectionState()

	return (
		<Fragment>
			<Heading as="h1" my={8}>
				{appName}
			</Heading>
			<Box mt={12}>
				{isWalletConnected ? <AccountInput /> : <ConnectWalletButton />}
			</Box>
		</Fragment>
	)
}

export default AppComponent
