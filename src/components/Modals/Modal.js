import { useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";
import {Form} from "../Forms/Form";

export default function MainModal({ isOpen, data, onClose, action, title, loading, buttonText }) {
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  function toDo(data) {
    action(data);
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w={"95%"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody pb={3}>
            <Form submit={toDo} onClose={onClose} data={data} loading={loading} buttonText={buttonText} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
