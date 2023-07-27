import dynamic from "next/dynamic";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { BtnTheme } from "./Buttons/BtnThemes";

const SearchEmployee = dynamic(() => import("./SearchEmployee"), {
  ssr:false,
  loading: () => <Spinner />
})

const Admin = dynamic(() => import("./Admin"), {
  ssr:false,
  loading: () => <Spinner />
})

export function HeaderApp({ user }) {
  return (
    <Flex
      flexWrap={"wrap"}
      px={{base:"1em", lg:"2em"}}
      py={"1.2em"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"1em"}
    >
      <Flex alignItems={"center"} gap={".7em"}>
        <Heading fontSize={"xl"}>Admin: </Heading>
        <Admin name={user.name} />
      </Flex>
      <Flex gap={"1em"}>
        <SearchEmployee />
        <BtnTheme />
      </Flex>
    </Flex>
  );
}
