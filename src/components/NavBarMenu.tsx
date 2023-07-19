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
import { useAuthUser } from "react-auth-kit";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const NavBarMenu = () => {
  const auth = useAuthUser();

  const signOut = useSignOut();
  const navigate = useNavigate();
  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            {auth() && (
              <>
                <Avatar
                  display={{ base: "none", md: "flex" }}
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
                  <Text fontSize="sm">
                    {auth()!.first_name} {auth()!.last_name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
              </>
            )}
            <Box display="flex">
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
          {auth() && (
            <>
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Settings</MenuItem>
            </>
          )}
          <MenuDivider />
          {auth() ? (
            <MenuItem
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              Cerrar Sesion
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Link to={"/login"}>Iniciar Sesion</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/register"}>Registrarse</Link>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavBarMenu;
