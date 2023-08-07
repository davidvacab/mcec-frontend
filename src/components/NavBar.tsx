import { Flex, HStack, Heading, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import NavBarMenu from "./NavBarMenu";
import useMainStore from "../store";
import { navBarStyles } from "../theme/theme";
import LanguageModeButton from "./LanguageModeButton";

const NavBar = () => {
  const location = useLocation();
  const openDrawer = useMainStore((s) => s.openSideDrawer);
  return (
    <Flex
      as={"header"}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={"space-between"}
      position={"sticky"}
      zIndex={3}
      top={0}
      {...navBarStyles}
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
        <Heading size={"xl"}>MCEC</Heading>
      </Link>
      <HStack spacing={{ base: "2", md: "6" }}>
        <LanguageModeButton />
        <ColorModeButton />
        <NavBarMenu />
      </HStack>
    </Flex>
  );
};

export default NavBar;
