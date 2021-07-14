import React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import Layout from "./components/resources/layout"
import AppComponent from "./components/app"

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<AppComponent />
			</Layout>
		</ChakraProvider>
	)
}

export default App
