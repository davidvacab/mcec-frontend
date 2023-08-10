import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";
import Hymn from "../entities/Hymn";
import { cardStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const { t, i18n } = useTranslation("hymnbook");
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale(i18n.language).format("DD/MMMM/YY");
  const [isLoading, setLoading] = useState(false);

  const fetchFile = async (url: string, name: string, type: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], `${name}.${type}`, { type: blob.type });
    return file;
  };

  const downloadZipFile = async () => {
    setLoading(true);
    const zip = new JSZip();

    await fetchFile(hymn.pdf_file, hymn.title, "pdf").then((file) =>
      zip.file(file.name, file)
    );

    await Promise.all(
      hymn.audio_files.map((audio) =>
        fetchFile(
          audio.audio_file,
          `${hymn.title} - ${t(`audio_voice.${audio.voice_type}`)}`,
          "mp3"
        ).then((file) => zip.file(file.name, file))
      )
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${hymn.title}.zip`);
    });
    setLoading(false);
  };

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
        <Stack divider={<StackDivider />} spacing={3} justifyContent={"right"}>
          <HStack align={"center"} spacing={1}>
            <Heading size="xs" textTransform="uppercase">
              {t("topic", { count: hymn.topics.length })}:
            </Heading>
            {hymn.topics.map((topic, i) => (
              <Text pt="1" fontSize="md" key={topic}>
                {`${t(`topic.${topic}`)}${
                  i + 1 !== hymn.topics.length ? "," : ""
                }`}
              </Text>
            ))}
          </HStack>
          {hymn.authors.length !== 0 && (
            <HStack spacing={1}>
              <Heading size="xs" textTransform="uppercase">
                {t("author", { count: hymn.authors.length })}:
              </Heading>
              {hymn.authors.map(({ id, first_name, last_name }, i) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}${
                    i + 1 !== hymn.authors.length ? "," : ""
                  }`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.arrangers.length !== 0 && (
            <HStack spacing={1}>
              <Heading size="xs" textTransform="uppercase">
                {t("arranger", { count: hymn.arrangers.length })}:
              </Heading>
              {hymn.arrangers.map(({ id, first_name, last_name }, i) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}${
                    i + 1 !== hymn.arrangers.length ? "," : ""
                  }`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.transcribers.length !== 0 && (
            <HStack spacing={1}>
              <Heading size="xs" textTransform="uppercase">
                {t("transcriber", { count: hymn.transcribers.length })}:
              </Heading>
              {hymn.transcribers.map(({ id, first_name, last_name }, i) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}${
                    i + 1 !== hymn.transcribers.length ? "," : ""
                  }`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.translators.length !== 0 && (
            <HStack spacing={1}>
              <Heading size="xs" textTransform="uppercase">
                {t("translator", { count: hymn.translators.length })}:
              </Heading>
              {hymn.translators.map(({ id, first_name, last_name }, i) => (
                <Text pt="1" fontSize="md" key={id}>
                  {`${first_name} ${last_name}${
                    i + 1 !== hymn.translators.length ? "," : ""
                  }`}
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
          <HStack>
            <Heading size={"xs"} textTransform={"uppercase"}>
              {t("download")}:
            </Heading>

            <Link href={hymn.pdf_file} target="blank" fontSize={"md"}>
              PDF
            </Link>
            <Divider maxW={3} />
            {hymn.audio_files.length > 0 && (
              <Link onClick={downloadZipFile} fontSize={"md"}>
                PDF+{t("audio", { count: hymn.audio_files.length })}
              </Link>
            )}
            {isLoading && <Spinner />}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HymnCard;
