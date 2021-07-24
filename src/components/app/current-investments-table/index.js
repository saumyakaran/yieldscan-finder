import {
	Avatar,
	Box,
	Button,
	HStack,
	IconButton,
	Table,
	TableCaption,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorMode,
} from "@chakra-ui/react"
import { CgMoreVerticalAlt } from "react-icons/cg"
import { get, map } from "lodash"
import { tokenImage } from "../../../app.config"
import { useCurrentInvestments } from "../../../lib/store"

const CurrentInvestmentsTable = () => {
	const { colorMode } = useColorMode()
	const { currentInvestments } = useCurrentInvestments()
	return (
		<Table opacity={0.5} _hover={{cursor: "not-allowed"}}>
			<TableCaption>Coming soon</TableCaption>
			<Thead>
				<Tr>
					<Th>Liquidity pools</Th>
					<Th>Value</Th>
					<Th isNumeric></Th>
				</Tr>
			</Thead>
			<Tbody>
				{map(currentInvestments, (investment, index) => (
					<Tr key={get(investment, "pool.id")}>
						<Td>
							<Box display="flex" alignItems="center">
								<Avatar
									name={get(investment, "pool.id[0]")}
									src={get(tokenImage, get(investment, "pool.id[0]"))}
									border="3px solid"
									borderColor={colorMode === "dark" ? "gray.600" : "gray.100"}
									color={colorMode === "dark" ? "gray.600" : "gray.100"}
									backgroundColor="white"
								/>
								<Avatar
									name={get(investment, "pool.id[1]")}
									src={get(tokenImage, get(investment, "pool.id[1]"))}
									ml={-4}
									border="3px solid"
									borderColor={colorMode === "dark" ? "gray.600" : "gray.100"}
									color={colorMode === "dark" ? "gray.600" : "gray.100"}
									backgroundColor="white"
								/>
								<Text display="inline-block" ml={2} fontWeight="medium">
									{get(investment, "pool.id[0]")}/
									{get(investment, "pool.id[1]")}
								</Text>
							</Box>
						</Td>
						<Td>{get(investment, "value")}</Td>
						<Td isNumeric>
							<HStack justify="flex-end">
								<Button isDisabled onClick={() => console.log("Claim")}>
									Claim
								</Button>
								<IconButton
									isDisabled
									aria-label="More options"
									icon={<CgMoreVerticalAlt />}
									onClick={() => console.log("More")}
								/>
							</HStack>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}

export default CurrentInvestmentsTable
