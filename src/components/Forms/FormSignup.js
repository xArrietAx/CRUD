import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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

  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false)

  async function submit(data) {
    setLoading(true)
    try {
      let res = await axios.post("/api/Signup", data)
      toast({
        title: 'Account created',
        description: res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      Router.push("/Auth/Signin")
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

      <FormControl id="name" isRequired isInvalid={errors.name}>
        <FormLabel>Username</FormLabel>
        <Input type="text" {...register("name", {
            required: "The username is required",
            minLength: {value:3, message:"The min length is 3 characters"},
            maxLength:{value:20, message:"The max length is 20 characters"},
            pattern: {value: /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/, message:"Please provide name valid"}
          })} />
            <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

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

      <FormControl id="password" isRequired isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} {...register("password", {
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
/> : "Signup"}
      </Button>

      </Stack>
    </form>
  );
}
