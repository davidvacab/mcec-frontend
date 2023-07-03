import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardContainer = ({ children }: Props) => {
  return (
    <Box
      maxWidth={"350px"}
      borderRadius={10}
      overflow={"hidden"}
      boxShadow={useColorModeValue("2xl", "outline")}
    >
      {children}
    </Box>
  );
};

export default HymnCardContainer;
