import { Stack } from "@chakra-ui/layout"
import React from "react"
import ConfirmButton from "./confirm-button"
import FromTokenInput from "./from-token-input"
import ToTokenInfo from "./to-token-info"

const AddLiquidityForm = () => (
	<Stack spacing={4}>
		<FromTokenInput />
        <ToTokenInfo />
        <ConfirmButton />
	</Stack>
)

export default AddLiquidityForm
