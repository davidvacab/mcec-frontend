import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
