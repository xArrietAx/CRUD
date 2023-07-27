import { useRouter } from "next/router";
import { Text, useToast, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Modal from "../Modals/WarningModal";

export function BtnDeleteAccount() {

  let Router = useRouter()

  let toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleDeleteAccount() {
        try {
          await axios.post("/api/DeleteAccount")
          return Router.push("/")
        } catch (err) {
          if (err.response.data.redirect) {
            toast({
              title: 'Error',
              description: err.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
            return Router.push("/Auth/Signin")
          }
          return toast({
              title: 'Error',
              description: err.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
        }
    }

    return(
       <>
        <Text _hover={{
          bg:"none"
        }} variant={"ghost"} textColor={"red.500"} w={"full"}
         onClick={onOpen}
        
         >
            Delete Account
        </Text>
        <Modal isOpen={isOpen} onClose={onClose} action={handleDeleteAccount} msg={"You are one step away from deleting your account, are you sure of your decision?"} />
       </>
    )
}