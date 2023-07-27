import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import Modal from "../../Modals/Modal";
import axios from "axios";
import { DataContext } from "@/context/DataContext";

export default function BtnCreate() {

  let Router = useRouter()

  let {DataEmployees, setDataEmployees} = useContext(DataContext)

  let toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function Create(data) {
      try {
        let res = await axios.post("/api/crud/Create", data)
        setDataEmployees([...DataEmployees, res.data.newEmployee])
         return toast({
          title: "Creation successful",
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
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
        <Button textColor={"white"} bg={"green.400"} _hover={{
          bg:"green.300"  
        }} onClick={onOpen}>
         Add item
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} action={Create} title={"Add Employee"} buttonText={"Add"} />
        </>
    )
}