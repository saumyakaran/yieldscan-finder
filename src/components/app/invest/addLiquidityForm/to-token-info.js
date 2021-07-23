import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"
import { get } from "lodash"
import React from "react"
import { useSelectedPool } from "../../../../lib/store"

const ToTokenInfo = () => {
	const { selectedPool } = useSelectedPool()
	const token1 = get(selectedPool, "pool[0].token")
	const token2 = get(selectedPool, "pool[1].token")

	return (
		<Stack
			border="1px solid"
			borderColor="inherit"
			borderRadius="xl"
			outline="2px solid transparent"
			py={2}
			px={4}
		>
			<Text fontSize="sm" color="GrayText">
				To
			</Text>
			<HStack>
				<Avatar name={selectedPool && token1 + " " + token2} size="sm" />
				<Text fontSize="xl" fontWeight="medium">
					{selectedPool && token1 + "/" + token2}
				</Text>
				<Text
					pl="1rem"
					fontSize="3xl"
					fontWeight="medium"
					textAlign="right"
					w="full"
					isTruncated
					opacity={0}
				>
					placeholder
				</Text>
			</HStack>
		</Stack>
	)
}

export default ToTokenInfo
