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
import { Form } from "@/components/Forms/FormSignin";

export default function Signup() {

  return (
  <>
  <Head>
        <title>Signin</title>
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
            Sign in
          </Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
          We hope you enjoy our product 
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
                Don't have an account? <Link href={"/Auth/Signup"} style={{color:"skyblue"}} >Sign up</Link>
              </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </Container>
  </>
  );
}