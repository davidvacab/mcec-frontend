import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { cardBorderColor } from "../../theme";

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
      borderWidth={1}
      borderColor={cardBorderColor()}
    >
      {children}
    </Box>
  );
};

export default HymnCardRowContainer;
