import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
  baseStyle: {
    fontWeight: "extrabold",
    color: "gold.600",
    _dark: {
      color: "gold.300",
    },
  },
});

export default Heading;
