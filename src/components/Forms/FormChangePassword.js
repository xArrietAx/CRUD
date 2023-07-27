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
  useToast,
  InputGroup, 
  InputRightElement,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
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
  const [showPassword, setShowPassword] = useState(false);

  async function submit(data) {
    setLoading(true)
    if (data.password === data.confirmpassword) {
      try {
         let res = await axios.post("/api/Changepassword", data)
         toast({
          title: 'Account created',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
         return Router.push("/Auth/Signin")
      } catch (err) {
        console.log(err);
        if (err.response.data.redirect) {
          toast({
            title: 'Error',
            description: err.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          return Router.push("/")
        }
         toast({
          title: 'Error',
          description: err.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    else {
      toast({
        title: 'Error',
        description: "Passwords are not the same",
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
      <FormControl id="password" isRequired isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} mb={"5px"} {...register("password", {
            required: "The password is required",
            minLength: {value:8, message:"The min length is 8 characters"},
            maxLength:{value: 25, message:"The max length is 25 characters"},
            pattern: {value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/, message:"Please provide valid password"},
          })} />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="confirmpassword" isRequired isInvalid={errors.confirmpassword}>
        <FormLabel>Confirm password</FormLabel>
          <Input type={"password"} mb={"5px"} {...register("confirmpassword", {
            required: "The password is required",
            minLength: {value:8, message:"The min length is 8 characters"},
            maxLength:{value: 25, message:"The max length is 25 characters"},
            pattern: {value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/, message:"Please provide valid password"},
          })} />
        <FormErrorMessage>
          {errors.confirmpassword && errors.confirmpassword.message}
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
