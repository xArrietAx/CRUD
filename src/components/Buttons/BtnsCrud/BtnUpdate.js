import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { DataContext } from "@/context/DataContext";
import Modal from "../../Modals/Modal";
import axios from "axios";


export default function BtnUpdate({data}) {

  let {_id} = data

  let Router = useRouter()

  const [loading, setLoading] = useState(false)

  let {setDataEmployees} = useContext(DataContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  let toast = useToast()
  
 async function Update(data) {
    try {
      setLoading(true)
      let res = await axios.put(`/api/crud/Update/${_id}`, data)
      setDataEmployees(res.data.filterData)
      setLoading(false)
      return toast({
        title: 'Update successful',
        description: res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      setLoading(false)
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
     <Button textColor={"white"} bg={"green.400"} _hover={{
          bg:"green.300"  
        }} onClick={onOpen} >Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose} data={data} action={Update} title={"Update Employee"} buttonText={"Update"} loading={loading}/>
    </>
  )
}