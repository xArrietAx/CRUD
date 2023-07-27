import { useContext } from "react";
import { Input, Stack,InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DataContext } from "../context/DataContext";

function SearchEmployee() {

  let {setSearch} = useContext(DataContext)

    return(
       <Stack>
         <InputGroup>
        <InputLeftElement         
        children={<SearchIcon color={"gray.400"} />}
        />
        <Input type="search" variant={"outline"} onChange={e => setSearch(e.target.value)} placeholder="Search by name" />
        </InputGroup>
       </Stack>
    )
}

export default SearchEmployee