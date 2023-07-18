import { extendTheme, ThemeConfig, useColorModeValue } from "@chakra-ui/react";

export const cardBorderColor = () => {
  const color = useColorModeValue("gray.400", "gray.600");
  return color;
};

export const layoutBorderColor = () => {
  const color = useColorModeValue("gray.300", "gray.800");
  return color;
};

export const layoutBgColor = () => {
  const color = useColorModeValue("gray.50", "gray.900");
  return color;
};

export const cardBgColor = () => {
  const color = useColorModeValue("gray.200", "gray.700");
  return color;
};

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
