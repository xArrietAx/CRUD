import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export function BtnTheme() {

    const { colorMode, toggleColorMode } = useColorMode()

    return(
        <Button rounded={"full"} shadow={"base"} w={30} variant={"outline"} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon /> }
        </Button>
    )
}