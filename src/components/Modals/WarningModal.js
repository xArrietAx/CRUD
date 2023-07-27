import { Button, Modal, ModalBody, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton, Text, ModalFooter } from "@chakra-ui/react";
import { WarningIcon} from "@chakra-ui/icons";

export default function ModalWarning({onClose, isOpen, action, msg, id}) {

  function toDo(e) {
    action(e.target.id)
    onClose()
  }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"95%"}>
          <ModalHeader display={"flex"} alignItems={"center"} gap={3}> <Text>WARNING</Text> <WarningIcon color={"red.500"} /></ModalHeader>
          <ModalBody>
            <Text>{msg}</Text>
          </ModalBody>
          <ModalFooter display={"flex"} alignItems={"center"} gap={3}>
            <Button variant='ghost' id={id} onClick={toDo}>Yes, I'm sure</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}