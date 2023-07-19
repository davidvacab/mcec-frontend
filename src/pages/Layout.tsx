import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { layoutBgColor } from "../theme";
import AlertMessage from "../components/AlertMessage";

const Layout = () => {
  return (
    <Box minH="100vh" bg={layoutBgColor()}>
      <NavBar />
      <AlertMessage />
      <Outlet />
    </Box>
  );
};

export default Layout;
