import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";

interface Props extends FlexProps {
  children: ReactNode;
  selected: boolean;
}

const NavItem = ({ children, selected, ...rest }: Props) => {
  return (
    <Link
      width={"100%"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        py="2"
        px={selected ? "5" : "2"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={selected ? "navy.700" : ""}
        _dark={selected ? { bg: "gray.700" } : {}}
        fontWeight={selected ? "bold" : ""}
        color={selected ? "white" : ""}
        _hover={{
          bg: "navy.700",
          color: "white",
          _dark: {
            bg: "gray.600",
          },
        }}
        {...rest}
      >
        {selected && <Icon as={BsArrowRightSquareFill} marginRight={2} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
