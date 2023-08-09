import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  Skeleton,
  Stack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  const { t } = useTranslation("home");
  useDocumentTitle(`${t("label.orfeon")} | MCEC`);
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: "0", lg: "12" }}
      py={{ base: "0", lg: "12" }}
    >
      <Stack
        direction={{ base: "column-reverse", lg: "row" }}
        spacing={{ base: "0", lg: "20" }}
      >
        <Box
          width={{ lg: "sm" }}
          transform={{ base: "translateY(-50%)", lg: "none" }}
          bg={{
            base: useColorModeValue("white", "gray.700"),
            lg: "transparent",
          }}
          mx={{ base: "6", md: "8", lg: "0" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack spacing={{ base: "3", lg: "5" }} textAlign={"center"}>
            <Stack spacing={3}>
              <Heading size="xl">{t("footer.about_us")}</Heading>
              <Text fontSize={"xl"}>{t("about_us.mcec")}</Text>
            </Stack>

            <Divider />

            <Stack spacing={0}>
              <Heading size={"md"}>{t("about_us.history")}</Heading>
              <Text>{t("about_us.history_des")}</Text>
            </Stack>

            <Divider />

            <Stack spacing={0}>
              <Heading size={"md"}>{t("about_us.contact_info")}</Heading>
              <Text>comision.orfeones@lldm.org</Text>
              <Text>Guadalajara, Jalisco, México, 44770</Text>
            </Stack>

            <Divider />

            <Flex m={"auto"}>
              <Link to={"/hymns"}>
                <HStack spacing="3">
                  <Heading fontWeight="bold" fontSize="lg">
                    {t("label.hymnbook")}
                  </Heading>
                  <Icon
                    color="gold.600"
                    _dark={{ color: "gold.300" }}
                    as={FaArrowRight}
                  />
                </HStack>
              </Link>
            </Flex>
          </Stack>
        </Box>
        <Flex flex="1" overflow="hidden">
          <Image
            src="assets/cover.jpg"
            alt="MCEC"
            fallback={<Skeleton />}
            maxH="450px"
            minW="300px"
            objectFit="cover"
            flex="1"
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default AboutUsPage;
