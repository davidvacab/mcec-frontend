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
  useColorModeValue,
} from "@chakra-ui/react";
import { RiFileMusicFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import { Hymn } from "../hooks/useHymns";
import dayjs from "dayjs";
import "dayjs/locale/es";
import useTopic from "../hooks/useTopic";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");
  const topic = useTopic(hymn.topic);

  return (
    <Card
      direction={"row"}
      bg={useColorModeValue("gray.100", "gray.700")}
      h={"100%"}
      onClick={() => console.log(hymn.title)}
      justifyContent={"space-between"}
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
              <Heading size="sm" textTransform="uppercase">
                Tema:
              </Heading>
              <Text pt="1" fontSize="md">
                {topic?.title}
              </Text>
            </VStack>
            {/*
            {hymn.author && (
              <VStack>
                <Heading size="xs" textTransform="uppercase">
                  Autor:
                </Heading>
                <Text pt="1" fontSize="sm">
                  {hymn.author.first_name + " " + hymn.author.last_name}
                </Text>
              </VStack>
            )}
            {hymn.arranger && (
              <VStack>
                <Heading size="xs" textTransform="uppercase">
                  Arreglista:
                </Heading>
                <Text pt="1" fontSize="sm">
                  {hymn.arranger.first_name + " " + hymn.arranger.last_name}
                </Text>
              </VStack>
            )}*/}
            <VStack>
              <Heading size="xs" textTransform="uppercase">
                Publicacion:
              </Heading>
              <Text pt="1" fontSize="md">
                {formattedDate}
              </Text>
            </VStack>
          </Stack>
        </CardBody>
      </Show>
      <Show above="md">
        <CardFooter justifyContent={"space-between"} minWidth={28}>
          <HStack justifyContent={"right"}>
            {hymn.pdf_file && (
              <Icon as={FaFilePdf} color={"gray.500"} boxSize={8} />
            )}
            {hymn.audio_set?.length !== 0 && (
              <Icon as={RiFileMusicFill} color={"gray.500"} boxSize={8} />
            )}
          </HStack>
        </CardFooter>
      </Show>
    </Card>
  );
};

export default HymnCard;
