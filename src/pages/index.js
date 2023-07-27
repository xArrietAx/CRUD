import Head from "next/head";
import Link from "next/link";
import {Heading, Container, Text, Button, Flex} from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"3xl"}>
        <Flex flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"30px"}
        minH={"100vh"}
        textAlign={"center"}
        >
          <Heading
            fontSize={{base:"5xl", md:"6xl"}}
            lineHeight={"110%"}
          >
            Manage your employees <br />
            <Text as={"span"} color={"cyan.400"}>
              efficiently
            </Text>
          </Heading>
          <Text  fontSize={{base:"md", md:"lg"}} color={"gray.500"}>
            Simplify the employee management process by utilizing our platform.
            Save time and resources with our user-friendly CRUD system that
            allows you to easily create, read, update, and delete employee
            information.
          </Text>
          <Flex w={"full"} flexDirection={"column"} alignItems={"center"}  gap={"10px"} justifyContent={"center"}>
          <Link href={"/Auth/Signin"}>
              <Button
              fontSize={"sm"}
                bg={"cyan.400"} textColor={"white"}
                _hover={{
                  bg: "cyan.500",
                }}
              >
                login
              </Button>
            </Link>
            <Text color={"gray.400"}>or</Text>
            <Link href={"/Auth/Signup"} >
            <Text fontWeight={"semibold"} >create an account</Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}