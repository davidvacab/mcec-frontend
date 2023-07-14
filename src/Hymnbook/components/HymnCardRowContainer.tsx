import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardRowContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      overflow={"hidden"}
      borderWidth={2}
      borderColor={useColorModeValue("blue.700", "blue.900")}
    >
      {children}
    </Box>
  );
};

export default HymnCardRowContainer;
