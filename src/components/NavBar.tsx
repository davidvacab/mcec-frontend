import { HStack, Image, useColorModeValue } from "@chakra-ui/react";
import logo from "../assets/card.jpg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding={"10px"} bg={useColorModeValue("gray.100", "gray.800")}>
      <Image src={logo} boxSize={"60px"} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
