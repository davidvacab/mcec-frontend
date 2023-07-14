import {
  Box,
  BoxProps,
  Flex,
  useColorModeValue,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends BoxProps {
  label: string;
  children: ReactNode;
  onClose: () => void;
}

const Sidebar = ({ label, children, onClose, ...rest }: Props) => {
  return (
    <Box
      as={"nav"}
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "72" }}
      pos="fixed"
      top={{ base: 0, md: "5rem" }}
      h={{ base: "full", md: "calc(100vh - 5rem)" }}
      overflowY={"auto"}
      overscrollBehavior={"contain"}
      padding={4}
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
          {label}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

export default Sidebar;
