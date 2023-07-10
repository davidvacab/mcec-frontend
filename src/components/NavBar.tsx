import {
  ButtonGroup,
  Flex,
  Image,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/card.jpg";
import ColorModeButton from "./ColorModeButton";
import NavMenu from "./NavMenu";

const NavBar = () => {
  return (
    <Flex
      as={"header"}
      alignItems={"center"}
      gap={"2"}
      position={"sticky"}
      zIndex={3}
      top={0}
      borderBottom={"1px"}
      height="4.5rem"
      minH={"4.5rem"}
      bg={useColorModeValue("white", "gray.800")}
      px={5}
    >
      <Image src={logo} boxSize={"3rem"} borderRadius={"2xl"} />
      <Spacer />
      <ButtonGroup gap="2">
        <ColorModeButton />
        <NavMenu />
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
