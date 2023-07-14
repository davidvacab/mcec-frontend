import {
  Flex,
  Link,
  Stack,
  useDisclosure,
  Text,
  useColorModeValue,
  Icon,
  Collapse,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props {
  label: string;
  children: ReactNode;
}

const NavCollapseGroup = ({ label, children }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box my={4}>
      <Flex
        py={2}
        onClick={onToggle}
        as={Link}
        justifyContent={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={AiOutlineDown}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          onClick={onToggle}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default NavCollapseGroup;
