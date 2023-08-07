import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation("home");
  useDocumentTitle(`${t("label.orfeon")} | MCEC`);
  return (
    <Box minH={"calc(100vh - 20)"}>
      <Carousel />
      <Footer />
    </Box>
  );
};

export default HomePage;
