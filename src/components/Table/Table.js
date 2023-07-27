import { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useColorModeValue
} from "@chakra-ui/react";
import { DataEmployee } from "./DataTables";
import { DataContext } from "@/context/DataContext";
import { useFetch } from "@/hooks/useFetch";

export default function TableEmployee() {

  let {Search} = useContext(DataContext)

  let {DataEmployees} = useFetch()

  return (
    <TableContainer className="scroll" maxH={"xl"} rounded={"md"} overflowY={"auto"} >
      <Table>
        <Thead position={"sticky"} top={0} zIndex={43} bg={useColorModeValue("gray.100", "gray.900")}>
          <Tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Department</Th>
            <Th>Salary</Th>
            <Th isNumeric>Phone</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {DataEmployees.length > 0 &&
          DataEmployees.filter(employee => {
            return employee?.name?.toLowerCase().includes(Search.toLowerCase())
          }).map(employee => {
            return <DataEmployee data={employee} key={employee._id} />
          })
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}
