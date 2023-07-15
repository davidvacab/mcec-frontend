import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import useMainStore from "../store";
import { layoutBorderColor } from "../theme";

interface Props extends BoxProps {
  label: string;
  children: ReactNode;
}

const Sidebar = ({ label, children, ...rest }: Props) => {
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);
  return (
    <Box
      as={"nav"}
      transition="3s ease"
      borderRightWidth={1}
      borderColor={layoutBorderColor()}
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
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={closeDrawer}
        />
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

export default Sidebar;
