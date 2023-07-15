import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { layoutBgColor } from "../theme";

const Layout = () => {
  return (
    <Box minH="100vh" bg={layoutBgColor()}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
