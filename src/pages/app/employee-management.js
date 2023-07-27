import Head from "next/head";
import dynamic from "next/dynamic";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import { HeaderApp } from "@/components/HeaderApp";
import { FooterApp } from "@/components/FooterApp";
import { Authentication } from "@/Database/Methods/Auth";
import { VerifyToken } from "@/utils/VerifyToken";

let Auth = new Authentication();

const TableEmployee = dynamic(() => import("@/components/Table/Table"), {
  ssr: false,
  loading: () => (
    <Flex alignItems={"center"} justifyContent={"center"} minH={"50vh"}>
      <Spinner size={"xl"} />
    </Flex>
  ),
});

export default function employeeManagement({ User }) {
  return (
    <>
      <Head>
        <title>Employee management</title>
      </Head>
      <Flex flexDirection={"column"} minH={"100vh"}>
        <HeaderApp user={User} />
        <Container maxW={"8xl"} p={{ base: "1em", lg: "2em" }}>
          <TableEmployee />
        </Container>
        <FooterApp />
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  let User;
  try {
    let { Token } = context.req.cookies;
    let id = await VerifyToken(Token);
    let user = await Auth.getUser(id);
    
    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    User = {
      name: user.name,
    };
  } catch (err) {
    User = {
      name: "unknown",
    };
  }

  return {
    props: {
      User,
    },
  };
}
