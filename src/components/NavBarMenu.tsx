import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBarMenu = () => {
  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Justina Clark</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <MenuItem>
            <Link to={"/hymns"}>Repertorio</Link>
          </MenuItem>
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem>Cerrar Sesion</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavBarMenu;
