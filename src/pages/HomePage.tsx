import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { useColorModeValue, Box } from "@chakra-ui/react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Home | MCEC");
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <Carousel />
      <Footer />
    </Box>
  );
};

export default HomePage;
