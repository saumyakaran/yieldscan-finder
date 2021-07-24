import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import {
	Avatar,
	InputGroup,
	InputLeftElement,
	Select,
	useColorMode,
} from "@chakra-ui/react"
import { get, map } from "lodash"
import React, { useEffect, useState } from "react"
import { tokenImage } from "../../../../app.config"
import {
	useInputAmount,
	useInputToken,
	useSelectedNetwork,
	useTokens,
	useWalletPromise,
} from "../../../../lib/store"

const FromTokenInput = () => {
	const { colorMode } = useColorMode()
	const { selectedNetwork } = useSelectedNetwork()
	const { inputAmount, setInputAmount } = useInputAmount()
	const [fromTokenName, setFromTokenName] = useState()
	const { setInputToken } = useInputToken()
	const { walletInstance } = useWalletPromise()
	const { tokens } = useTokens()

	const amountHandler = ({ target: { value } }) => {
		setInputAmount(value)
	}

	const handleToken = ({ target: { value } }) => {
		if (walletInstance) {
			const _fromToken = walletInstance.getToken(value)
			setFromTokenName(value)
			setInputToken(_fromToken)
			console.log(_fromToken)
		}
	}

	useEffect(() => {
		setInputToken({
			chain: undefined,
			decimal: 13,
			isDexShare: false,
			isERC20: false,
			isTokenSymbol: true,
			name: "ACA",
		})
	}, [setInputToken])

	return (
		<FormControl
			border="1px solid"
			borderColor="inherit"
			borderRadius="xl"
			outline="2px solid transparent"
			py={2}
			px={4}
		>
			<FormLabel fontSize="sm" color="GrayText">
				From
			</FormLabel>
			<InputGroup>
				<InputLeftElement width="9rem">
					<Avatar
						name={fromTokenName || get(selectedNetwork, "denom")}
						src={
							get(tokenImage, fromTokenName) ||
							get(tokenImage, get(selectedNetwork, "denom"))
						}
						border="3px solid"
						borderColor={colorMode === "dark" ? "gray.600" : "gray.100"}
						color={colorMode === "dark" ? "gray.600" : "gray.100"}
						backgroundColor="white"
					/>
					<Select
						value={fromTokenName}
						onChange={handleToken}
						fontSize="xl"
						fontWeight="medium"
						outline="none"
						border="none"
						isDisabled={!walletInstance}
						focusBorderColor="none"
						ml={2}
						_hover={{
							cursor: "pointer",
							backgroundColor: colorMode === "dark" ? "gray.600" : "gray.100",
						}}
					>
						{map(tokens, (token) => {
							const _token = get(token, "name")
							return (
								<option key={_token} value={_token}>
									{_token}
								</option>
							)
						})}
					</Select>
				</InputLeftElement>
				<Input
					type="number"
					pl="10rem"
					textAlign="right"
					placeholder="1000"
					value={inputAmount || ""}
					onChange={amountHandler}
					outline="none"
					border="none"
					fontSize="3xl"
					fontWeight="medium"
					_focus={{ boxShadow: "none" }}
					isTruncated
				/>
			</InputGroup>
		</FormControl>
	)
}

export default FromTokenInput
