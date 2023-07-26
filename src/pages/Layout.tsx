import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { layoutStyles } from "../theme/theme";

const Layout = () => {
  return (
    <Box minH="100vh" {...layoutStyles}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
