import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  const { onOpen } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <NavBar onOpen={onOpen} />
      <Outlet />
    </Box>
  );
};

export default Layout;
