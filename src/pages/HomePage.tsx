import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { layoutBgColor } from "../theme";

const HomePage = () => {
  useDocumentTitle("Home | MCEC");
  return (
    <Box minH={"calc(100vh - 20)"} bg={layoutBgColor()}>
      <Carousel />
      <Footer />
    </Box>
  );
};

export default HomePage;
