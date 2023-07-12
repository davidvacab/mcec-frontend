import {
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import NavBarMenu from "./NavBarMenu";

interface Props extends FlexProps {
  onOpen: () => void;
}
const NavBar = ({ onOpen, ...rest }: Props) => {
  return (
    <Flex
      as={"header"}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={"space-between"}
      position={"sticky"}
      zIndex={3}
      top={0}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiSearch />}
      />
      <Link to={"/"}>
        <Text
          display={"flex"}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          MCEC
        </Text>
      </Link>
      <HStack spacing={{ base: "2", md: "6" }}>
        <ColorModeButton />
        <NavBarMenu />
      </HStack>
    </Flex>
  );
};

export default NavBar;
