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
  useToast,
} from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const NavBarMenu = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const toast = useToast();

  const baseURL = "http://127.0.0.1:8000";
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
                  src={baseURL + auth()?.profile.picture}
                />

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {auth()?.first_name} {auth()?.last_name}
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
                toast({
                  title: "Logout",
                  description: "Sesion Terminada",
                  status: "info",
                  position: "top",
                  duration: 9000,
                  isClosable: true,
                });
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
