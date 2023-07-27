import {Tr, Td, Flex } from "@chakra-ui/react";
import BtnDelete from "../Buttons/BtnsCrud/BtnDelete";
import BtnUpdate from "../Buttons/BtnsCrud/BtnUpdate";

export function DataEmployee({data}) {
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>{data.surname}</Td>
      <Td>{data.department}</Td>
      <Td>{data.salary} $ </Td>
      <Td isNumeric>{data.phone}</Td>
      <Td >
        <Flex gap={5}>
        <BtnUpdate data={data} />
       <BtnDelete data={data} />
        </Flex>
      </Td>
    </Tr>
  );
}
