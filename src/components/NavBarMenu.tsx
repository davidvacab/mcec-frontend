import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { usePersistStore } from "../store";

const NavBarMenu = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation("home");
  const profile = usePersistStore((s) => s.persistElements.profile);
  const setProfile = usePersistStore((s) => s.setProfile);
  if (profile && auth()) setProfile(auth()?.profile);

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FiChevronDown />}
          color={"navy.700"}
          _dark={{ color: "white" }}
          bg={"transparent"}
          transition="all 0.3s"
        >
          {auth() && profile && (
            <HStack>
              <Avatar
                display={{ base: "none", md: "flex" }}
                size={"sm"}
                src={decodeURI(profile.profile_picture)}
              />

              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{profile.first_name}</Text>
                <Text fontSize="sm">{profile.last_name}</Text>
              </VStack>
            </HStack>
          )}
        </MenuButton>
        <MenuList>
          <Link to={"/hymns"}>
            <MenuItem>{t("label.hymnbook")}</MenuItem>
          </Link>
          {auth() ? (
            <>
              <Link to={"/profile/me"}>
                <MenuItem>{t("common:label.profile")}</MenuItem>
              </Link>
              {/* <MenuItem>{t("navmenu.problem")}</MenuItem> */}
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  if (signOut()) {
                    setProfile(undefined);
                    toast({
                      title: t("navmenu.logout"),
                      description: t("navmenu.logout_des"),
                      status: "info",
                      position: "top",
                      duration: 9000,
                      isClosable: true,
                    });
                    navigate("/");
                  }
                }}
              >
                {t("navmenu.logout")}
              </MenuItem>
            </>
          ) : (
            <>
              <MenuDivider />
              <Link to={"/login"}>
                <MenuItem>{t("common:label.signin")}</MenuItem>
              </Link>

              <Link to={"/register"}>
                <MenuItem>{t("common:label.signup")}</MenuItem>
              </Link>
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavBarMenu;
