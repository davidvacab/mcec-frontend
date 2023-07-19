import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import NavBarMenu from "./NavBarMenu";
import useMainStore from "../store";
import { layoutBgColor, layoutBorderColor } from "../theme";

const NavBar = () => {
  const location = useLocation();
  const openDrawer = useMainStore((s) => s.openSideDrawer);
  return (
    <Flex
      as={"header"}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={layoutBgColor()}
      borderBottomWidth={1}
      borderColor={layoutBorderColor()}
      justifyContent={"space-between"}
      position={"sticky"}
      zIndex={3}
      top={0}
    >
      {location.pathname === "/hymns" && (
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={openDrawer}
          variant="outline"
          aria-label="open menu"
          icon={<FiSearch />}
        />
      )}
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
