import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import Heading from "./components/Heading";

const bgDark = "gray.900";
const bgLight = "gray.100";
const borderDark = "gray.600";

export const layoutStyles = { bg: bgLight, _dark: { bg: bgDark } };

export const navBarStyles = {
  bg: "whiteAlpha.900",
  boxShadow: "xl",
  _dark: {
    bg: "gray.800",
    borderBottomWidth: 1,
    borderBottomColor: borderDark,
  },
};

export const sideBarStyles = {
  bg: bgLight,
  borderRightWidth: 1,
  borderRightColor: "gray.400",
  _dark: {
    bg: bgDark,
    borderRightColor: borderDark,
  },
};

export const cardStyles = {
  bg: "whiteAlpha.900",
  rounded: "lg",
  boxShadow: "2xl",
  _dark: {
    bg: "gray.800",
    borderWidth: 1,
    borderColor: borderDark,
  },
};

export const cardOpaqueStyles = {
  bg: "whiteAlpha.800",
  opacity: "99%",
  _dark: { bg: "gray.800", opacity: "96%" },
};

export const inputStyles = {
  borderWidth: 1,
  borderColor: "gray.400",
  _dark: {
    borderColor: borderDark,
  },

  _focus: {
    bg: bgLight,
    _dark: {
      bg: bgDark,
    },
  },
};

export const selectStyles = {
  borderColor: "gray.400",
  _dark: {
    borderColor: borderDark,
  },

  _focus: {
    bg: bgLight,
    option: {
      bg: bgLight,
    },
    _dark: {
      bg: bgDark,
      option: {
        bg: bgDark,
      },
    },
  },
};

export const tabStyles = {
  _selected: {
    bg: "navy.700",
    color: "white",
    _dark: {
      bg: bgDark,
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
