import { extendTheme, ThemeConfig, useColorModeValue } from "@chakra-ui/react";

export const cardBorderColor = () => useColorModeValue("gray.400", "gray.600");
export const layoutBorderColor = () =>
  useColorModeValue("gray.300", "gray.800");
export const layoutBgColor = () => useColorModeValue("gray.50", "gray.900");
export const cardBgColor = () => useColorModeValue("gray.200", "gray.700");

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Geologica', sans-serif`,
    body: `'Geologica', sans-serif`,
  },
});

export default theme;
