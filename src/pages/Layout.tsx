import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const Layout = () => {
  const { onOpen } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <NavigationBar onOpen={onOpen} />
      <Outlet />
    </Box>
  );
};

export default Layout;
