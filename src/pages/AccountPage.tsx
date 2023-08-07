import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { cardStyles, tabStyles } from "../theme/theme";
import PasswordChangeForm from "../components/PasswordChangeForm";
import ProfileForm from "../components/ProfileForm";
import ChurchForm from "../components/ChurchForm";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ProfileFormTemplate = () => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              John Doe
            </Heading>
            <Text color={"gray.500"}>Frontend Developer</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Follow
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

const ProfilePage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("page.account")} | MCEC`);
  const tabs = [
    { title: t("member.account"), form: ProfileFormTemplate },
    { title: t("member.password"), form: PasswordChangeForm },
    { title: t("common:label.profile"), form: ProfileForm },
    { title: t("member.church"), form: ChurchForm },
  ];
  return (
    <Box minH={"calc(100vh - 20)"} p={5}>
      <Tabs
        isFitted
        variant="enclosed"
        maxW={800}
        h={"100%"}
        m={"20px auto"}
        {...cardStyles}
      >
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.title} {...tabStyles}>
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.title}>{tab.form()}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
