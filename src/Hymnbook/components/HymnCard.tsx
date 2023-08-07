import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Hymn from "../entities/Hymn";
import { cardStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const { t } = useTranslation("hymnbook");
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");

  return (
    <Card w={"100%"} h={"100%"} borderRadius={10} {...cardStyles}>
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
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" justifyContent={"right"}>
          <HStack align={"center"}>
            <Heading size="sm" textTransform="uppercase">
              {t("topic", { count: hymn.topics.length })}
            </Heading>
            {hymn.topics.map((topic) => (
              <Text pt="1" fontSize="md" key={topic}>
                {t(`topic.${topic}`)}
              </Text>
            ))}
          </HStack>
          {hymn.authors.length !== 0 && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {t("author", { count: hymn.authors.length })}
              </Heading>
              {hymn.authors.map(({ id, first_name, last_name }) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.arrangers.length !== 0 && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {t("arranger", { count: hymn.arrangers.length })}
              </Heading>
              {hymn.arrangers.map(({ id, first_name, last_name }) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.transcribers.length !== 0 && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {t("transcriber", { count: hymn.transcribers.length })}
              </Heading>
              {hymn.transcribers.map(({ id, first_name, last_name }) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.translators.length !== 0 && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {t("translator", { count: hymn.translators.length })}
              </Heading>
              {hymn.translators.map(({ id, first_name, last_name }) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}`}
                </Text>
              ))}
            </HStack>
          )}
          <HStack>
            <Heading size="xs" textTransform="uppercase">
              {t("release_date")}
            </Heading>
            <Text pt="1" fontSize="md">
              {formattedDate}
            </Text>
          </HStack>
          {hymn.notes && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {t("notes")}
              </Heading>
              <Text pt="1" fontSize="md">
                {hymn.notes}
              </Text>
            </HStack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HymnCard;
