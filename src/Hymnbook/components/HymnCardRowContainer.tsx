import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardRowContainer = ({ children }: Props) => {
  return (
    <Box
      overflow={"hidden"}
      boxShadow={"xl"}
      borderRadius={5}
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
        boxShadow: "2xl",
      }}
    >
      {children}
    </Box>
  );
};

export default HymnCardRowContainer;
