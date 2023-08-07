import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LanguageModeButton = () => {
  const { i18n } = useTranslation();
  return (
    <Button
      padding={3}
      rounded="full"
      aria-label="Language Mode"
      bg={"transparent"}
      color={"navy.700"}
      _dark={{ color: "white" }}
      size={"xl"}
      variant="outline"
      onClick={() => i18n.changeLanguage(i18n.language === "es" ? "en" : "es")}
    >
      {i18n.language === "es" ? "ES" : "EN"}
    </Button>
  );
};

export default LanguageModeButton;
