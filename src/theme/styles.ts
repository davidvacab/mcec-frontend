import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("gray.50", "gray.900")(props),
    },
  }),
};

export default styles;
