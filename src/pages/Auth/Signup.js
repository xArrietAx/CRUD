import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container
} from '@chakra-ui/react';
import { Form } from "@/components/Forms/FormSignup";

export default function Signup() {
  return (
  <>
  <Head>
        <title>Signup</title>
      </Head>
    <Container maxW={"4xl"}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.900')}>
      <Stack spacing={'5'} w={"full"} maxW={"2xl"} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} textColor={"gray.400"} >
            to enjoy all of our cool features
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <Form />
            <Stack pt={6}>
              <Text align={'center'}>
                Already have an account? <Link href={"/Auth/Signin"} style={{color:"skyblue"}} >Login</Link>
              </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </Container>
  </>
  );
}