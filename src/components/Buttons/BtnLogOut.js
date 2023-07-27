import { useRouter } from "next/router";
import { DataContext } from "@/context/DataContext";
import { useContext } from "react";
import { Text, useToast, useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import Modal from "../Modals/WarningModal";

export function BtnLogOut() {

  let Router = useRouter()

  const {setDataEmployees} = useContext(DataContext)

    let toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleLogOut() {
        try {
          let res = await axios.post("/api/LogOut")
          toast({
            title: res.data.message,
            description: "we'll be waiting for you",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          Router.push("/")
          return setDataEmployees([])
        } catch (err) {
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
        <Text variant={"ghost"} _hover={{
          bg:"none"
        }} w={"full"} onClick={onOpen}>
            Log Out
        </Text>
        <Modal isOpen={isOpen} onClose={onClose} action={handleLogOut} msg={"Do you want to close the session?"} />
        </>
    )
}