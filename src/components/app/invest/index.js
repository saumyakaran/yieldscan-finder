import {
	Button,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import { get, map } from "lodash"

const InvestComponent = ({ liquidityPools, handleInvest }) => {
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
							{get(pool, "id[0]")}/{get(pool, "id[1]")}
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

export default InvestComponent
