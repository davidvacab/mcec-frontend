import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      overflow={"hidden"}
      boxShadow={useColorModeValue("2xl", "dark-lg")}
    >
      {children}
    </Box>
  );
};

export default HymnCardContainer;
