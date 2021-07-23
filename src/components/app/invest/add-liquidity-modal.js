import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { ModalCloseButton, ModalHeader } from "@chakra-ui/react"
import React from "react"
import AddLiquidityForm from "./addLiquidityForm"

const AddLiquidityModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Liquidity</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<AddLiquidityForm />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default AddLiquidityModal
