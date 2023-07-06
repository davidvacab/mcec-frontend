import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      overflow={"hidden"}
      boxShadow={useColorModeValue("2xl", "dark-lg")}
    >
      {children}
    </Box>
  );
};

export default HymnCardContainer;
