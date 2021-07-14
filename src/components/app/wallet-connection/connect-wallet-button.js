import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { has } from "lodash"
import React, { useEffect, useState } from "react"
import { Fragment } from "react"
import WalletConnectionModal from "./wallet-connection-modal"

const ConnectWalletButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [hasExtension, setHasExtension] = useState(false)

	const handleInstall = () => {
		window.open("https://polkadot.js.org/extension")
	}

	const handleExtension = () => {
		// TODO: Figure out a way to detect if extension is installed without the user having to refresh the page
		setHasExtension(has(window, "injectedWeb3['polkadot-js']"))
	}

	useEffect(() => {
		setTimeout(() => {
			handleExtension()
		}, 250)
	})

	return (
		<Fragment>
			<Button
				colorScheme="purple"
				size="lg"
				onClick={hasExtension ? onOpen : handleInstall}
			>
				{hasExtension ? "Connect Wallet" : "Install polkadot{.js}"}
			</Button>
			{hasExtension && isOpen && (
				<WalletConnectionModal isOpen={isOpen} onClose={onClose} />
			)}
		</Fragment>
	)
}

export default ConnectWalletButton
