import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import Heading from "./components/Heading";

export const layoutStyles = { bg: "gray.50", _dark: { bg: "gray.900" } };

export const navBarStyles = {
  bg: "gray.100",
  borderBottomWidth: 1,
  borderBottomColor: "gray.400",
  boxShadow: "xl",
  _dark: {
    bg: "gray.800",
    borderBottomColor: "gray.700",
  },
};

export const sideBarStyles = {
  bg: "gray.50",
  borderRightWidth: 1,
  borderRightColor: "gray.400",
  _dark: {
    bg: "gray.900",
    borderRightColor: "gray.700",
  },
};

export const cardStyles = {
  bg: "gray.100",
  rounded: "lg",
  borderWidth: 1,
  boxShadow: "xl",
  borderColor: "gray.400",
  _dark: {
    bg: "gray.800",
    borderColor: "gray.700",
  },
};

export const cardOpaqueStyles = {
  bg: "whiteAlpha.800",
  opacity: "99%",
  _dark: { bg: "gray.800", opacity: "96%" },
};

export const inputStyles = {
  borderWidth: 1,
  borderColor: "gray.500",
  _dark: {
    borderColor: "gray.600",
    _focus: {
      bg: "gray.900",
    },
  },
  _focus: {
    bg: "gray.50",
    _dark: {
      borderColor: "gray.900",
    },
  },
};

export const selectStyles = {
  borderColor: "gray.400",
  _focus: {
    bg: "gray.50",
  },
  "> option, > optgroup": {
    bg: "gray.50",
  },
  _dark: {
    borderColor: "gray.600",
    _focus: {
      bg: "gray.900",
    },
    "> option, > optgroup": {
      bg: "gray.900",
    },
  },
};

export const borderWidth = 1.5;

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components: {
    Heading,
  },
});

export default theme;
