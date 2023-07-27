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
import { Form } from "@/components/Forms/FormVerifyKey";

export default function Verifykey() {
  return (
  <>
  <Head>
        <title>verify key</title>
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
            Verify key
          </Heading>
          <Text fontSize={'lg'} textColor={"gray.400"} >
            Put the key we sent you
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