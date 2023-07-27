import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import Modal from "@/components/Modals/WarningModal";
import { DataContext } from "@/context/DataContext";
import axios from "axios";

export default function BtnDelete({data}) {

  let Router = useRouter()

  let {setDataEmployees} = useContext(DataContext)

  let toast = useToast()

  let {isOpen, onClose, onOpen} = useDisclosure()

    async function Delete(id) {
        try {
         let res = await axios.delete(`/api/crud/Delete/${id}`)
         setDataEmployees(res.data.filterData)
         return toast({
          title: 'Elimination successful',
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

  return (
    <>
     <Button onClick={onOpen} textColor={"white"} bg={"red.400"} _hover={{
            bg:"red.300"
        }} >Delete</Button>
        <Modal isOpen={isOpen} onClose={onClose} id={data._id} action={Delete} msg={"Are you sure to delete this employee?"}  />
    </>
  )
}
