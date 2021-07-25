import { Stack } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import React from "react"
import ConfirmButton from "./confirm-button"
import FromTokenInput from "./from-token-input"
import TipToggle from "./tip-toggle"
import ToTokenInfo from "./to-token-info"

const AddLiquidityForm = () => (
	<Stack spacing={4} pb={4}>
		<FromTokenInput />
		<ToTokenInfo />
		<Stack pb={4}>
			<TipToggle />
			<Text color="GrayText">A little support goes a long way!</Text>
		</Stack>
		<ConfirmButton />
	</Stack>
)

export default AddLiquidityForm
