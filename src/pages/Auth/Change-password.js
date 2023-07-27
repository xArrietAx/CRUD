import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Button
} from '@chakra-ui/react';
import { Form } from "@/components/Forms/FormChangePassword";


export default function ResetPassword() {

  return (
  <>
  <Head>
        <title>Change password</title>
      </Head>
    <Container maxW={"4xl"}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.900')}>
      <Stack spacing={'5'} w={"full"} maxW={"2xl"} py={10} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Change password
          </Heading>
          <Text textAlign={"center"} fontSize={'lg'} textColor={"gray.400"} >
            Here you can to change your password, provide a strong password for your security
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <Form />
        <Link href={"/Auth/Reset-password"}>
        <Button mt={5} >Back</Button>
        </Link>
        </Box>
      </Stack>
    </Flex>
    </Container>
  </>
  );
}