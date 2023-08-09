import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Icon,
  Show,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { FaFilePdf } from "react-icons/fa";
import { RiFileMusicFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import HymnListItem from "../entities/HymnListItem";
import { cardStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";

interface Props {
  hymn: HymnListItem;
}

const HymnCardRow = ({ hymn }: Props) => {
  const { t, i18n } = useTranslation("hymnbook");
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale(i18n.language).format("DD/MMMM/YY");

  return (
    <Link to={"/hymns/" + hymn.slug}>
      <Card
        direction={"row"}
        h={"100%"}
        justifyContent={"space-between"}
        {...cardStyles}
      >
        <CardHeader textAlign={"center"}>
          <Heading
            size={{
              sm: "sm",
              md: "md",
              lg: "md",
            }}
          >
            {hymn.title}
          </Heading>
        </CardHeader>
        <Show above="lg">
          <CardBody>
            <Stack
              divider={<StackDivider />}
              spacing="4"
              direction={"row"}
              justifyContent={"right"}
            >
              <VStack>
                <Text
                  size="sm"
                  fontWeight={"extrabold"}
                  textTransform="uppercase"
                >
                  {t("topic", { count: hymn.topics.length })}
                </Text>
                <VStack spacing={0}>
                  {hymn.topics.map((topic, i) => (
                    <Text pt="1" fontSize="md" key={topic}>
                      {`${t(`topic.${topic}`)}${
                        i + 1 !== hymn.topics.length ? "," : ""
                      }`}
                    </Text>
                  ))}
                </VStack>
              </VStack>
              <VStack>
                <Text
                  size="sm"
                  fontWeight={"extrabold"}
                  textTransform="uppercase"
                >
                  {t("release_date")}
                </Text>
                <Text pt="1" fontSize="md">
                  {formattedDate}
                </Text>
              </VStack>
            </Stack>
          </CardBody>
        </Show>
        <Show above="lg">
          <CardFooter justifyContent={"space-between"} minWidth={28}>
            <HStack justifyContent={"right"}>
              {hymn.pdf_file && (
                <Icon
                  as={FaFilePdf}
                  color={"navy.700"}
                  _dark={{ color: "white" }}
                  boxSize={8}
                />
              )}
              {hymn.audios?.length !== 0 && (
                <Icon
                  as={RiFileMusicFill}
                  color={"navy.700"}
                  _dark={{ color: "white" }}
                  boxSize={8}
                />
              )}
            </HStack>
          </CardFooter>
        </Show>
      </Card>
    </Link>
  );
};

export default HymnCardRow;
