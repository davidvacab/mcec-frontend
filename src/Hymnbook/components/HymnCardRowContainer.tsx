import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HymnCardRowContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={5}
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      overflow={"hidden"}
    >
      {children}
    </Box>
  );
};

export default HymnCardRowContainer;
