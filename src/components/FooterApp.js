import dynamic from "next/dynamic";
import { Flex, Spinner } from "@chakra-ui/react";

const Menu = dynamic(() => import("./Menu"), {
    ssr:false,
    loading: () => <Spinner />
})  

const BtnCreate = dynamic(() => import("./Buttons/BtnsCrud/BtnCreate"), {
    ssr:false,
    loading: () => <Spinner />
})

export function FooterApp() {
    return(
        <Flex position={"fixed"} bottom={0} flexWrap={"wrap"} w={"full"} px={{base:"1em", lg:"2em"}} py={"1.5em"} mt={"auto"} alignItems={"center"} justifyContent={"space-between"} gap={"10px"} >
            <BtnCreate />
            <Menu />
    </Flex>
    )
}