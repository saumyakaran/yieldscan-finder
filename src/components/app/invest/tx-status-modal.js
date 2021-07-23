import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { Spinner, Stack, Text } from "@chakra-ui/react"
import React from "react"

const TxStatusModal = ({ isOpen, onClose, stakingEvent }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={false}
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent minH="350px">
				<ModalBody
					display="flex"
					flexDir="column"
					h="full"
					alignItems="center"
					justifyContent="center"
				>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="purple"
						size="xl"
					/>
					<Text mt={4}>
						{stakingEvent || "Waiting for you to sign the transaction..."}
					</Text>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default TxStatusModal
