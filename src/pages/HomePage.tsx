import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { useColorModeValue, Box } from "@chakra-ui/react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Home");
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Carousel />
      <Footer />
    </Box>
  );
};

export default HomePage;
