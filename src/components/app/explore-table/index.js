import {
	Avatar,
	Box,
	Button,
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
import { get, map } from "lodash"
import { tokenImage } from "../../../app.config"

const ExploreTable = ({ liquidityPools, handleInvest }) => {
	const { colorMode } = useColorMode()
	return (
		<Table>
			<TableCaption>End of list</TableCaption>
			<Thead>
				<Tr>
					<Th>#</Th>
					<Th>Available pools</Th>
					<Th>Liquidity</Th>
					<Th isNumeric>Fee APR</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{map(liquidityPools, (pool, index) => (
					<Tr key={get(pool, "id")}>
						<Td>{index + 1}</Td>
						<Td>
							<Box display="flex" alignItems="center">
								<Avatar
									name={get(pool, "id[0]")}
									src={get(tokenImage, get(pool, "id[0]"))}
									border="3px solid"
									borderColor={colorMode === "dark" ? "gray.600" : "gray.100"}
									color={colorMode === "dark" ? "gray.600" : "gray.100"}
									backgroundColor="white"
								/>
								<Avatar
									name={get(pool, "id[1]")}
									src={get(tokenImage, get(pool, "id[1]"))}
									ml={-4}
									border="3px solid"
									borderColor={colorMode === "dark" ? "gray.600" : "gray.100"}
									color={colorMode === "dark" ? "gray.600" : "gray.100"}
									backgroundColor="white"
								/>
								<Text display="inline-block" ml={2} fontWeight="medium">
									{get(pool, "id[0]")}/{get(pool, "id[1]")}
								</Text>
							</Box>
						</Td>
						<Td>-</Td>
						<Td isNumeric>N/A</Td>
						<Td isNumeric>
							<Button onClick={() => handleInvest(pool)}>Invest</Button>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}

export default ExploreTable
