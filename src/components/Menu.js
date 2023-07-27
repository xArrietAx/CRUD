import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { BtnLogOut } from "./Buttons/BtnLogOut";
import { BtnDeleteAccount } from "./Buttons/BtnDeleteAccount";

export default function MenuBtns() {
  return (
    <Menu >
      <MenuButton as={Button} rightIcon={<ChevronUpIcon />}>
        Config
      </MenuButton>
      <MenuList>
        <MenuItem><BtnLogOut /></MenuItem>
        <MenuItem><BtnDeleteAccount /></MenuItem>
      </MenuList>
    </Menu>
  );
}
