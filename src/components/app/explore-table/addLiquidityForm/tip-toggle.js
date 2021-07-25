import { FormControl, FormLabel, Switch } from "@chakra-ui/react"
import { useTips } from "../../../../lib/store"

const TipToggle = () => {
	const { isTipping, setIsTipping } = useTips()
	const handleTipping = ({ target: { checked } }) => {
		setIsTipping(checked)
	}
	return (
		<FormControl
			display="flex"
			alignItems="center"
			w="full"
			justifyContent="space-between"
			pt={4}
		>
			<FormLabel htmlFor="tips" mb={0}>
				🎁 Support the author with a 0.1% tip?
			</FormLabel>
			<Switch
				id="tips"
				colorScheme="purple"
				onChange={handleTipping}
				isChecked={isTipping}
			/>
		</FormControl>
	)
}

export default TipToggle
