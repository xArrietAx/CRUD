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
       await axios.post(`/api/Verifykey/${Router.query.email}`, data)
       Router.push("/Auth/Change-password")
    } catch (err) {
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
      <FormControl id="key" isRequired isInvalid={errors.key}>
        <FormLabel>Verify key</FormLabel>
        <Input type="text" {...register("key", {
            required:"The key is required",
            min: {
                value: 4,
                message:"Provide a valid key"
            },
            minLength: {
              value: 4,
              message:"Provide a valid key"
          },
            max: {
                value: 10,
                message:"Provide a valid key"
            },
            maxLength: {
              value: 10,
              message:"Provide a valid key"
          },
            pattern: {
                value:/^[A-Za-z0-9-_]*$/,
                message:"Provide a valid key"
            }
        })} />
          <FormErrorMessage>
          {errors.key && errors.key.message}
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
