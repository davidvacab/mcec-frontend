import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsArrowRight } from "react-icons/bs";

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
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={selected ? "cyan.600" : ""}
        _hover={{
          bg: "gray.500",
          color: "white",
        }}
        {...rest}
      >
        {selected && <Icon as={BsArrowRight} marginRight={2} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
