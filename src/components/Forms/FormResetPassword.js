import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Spinner,
  useToast
} from "@chakra-ui/react";
import axios from "axios";

export function Form() {

  let Router = useRouter()

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast()

  const [Loading, setLoading] = useState(false)

  async function submit(data) {
    setLoading(true)
    try {
       let res = await axios.post("/api/Resetpassword", data)
       toast({
         title: "Success",
         description: res.data.message,
         status: 'success',
         duration: 5000,
         isClosable: true,
        })
        Router.push(`/Auth/Verify-key/${res.data.email}`)
    } catch (err) {
       console.log(err);
       toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    reset()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={6}>
      <FormControl id="email" isRequired isInvalid={errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("email", {
            required: "The email is required",
            minLength: {value: 5, message:"The min length is 5 characters"},
            maxLength:{value:40, message:"The max length is 40 characters"},
            pattern: {value:/^(?=.{1,256})(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, message:"Please provide a valid email"}
          })} />
          <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <Button
      loadingText="Submitting"
      size="lg"
      bg={"green.400"}
      color={"white"}
      _hover={{
        bg: "green.500",
      }}
      type="submit"
      >
        {Loading === true ? <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='md'
/> : "Send"}
      </Button>
      </Stack>
    </form>
  );
}
