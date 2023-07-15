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
import { cardBgColor } from "../../theme";
import { HymnListItem } from "../entities/HymnListItem";
import useTopic from "../hooks/useTopic";

interface Props {
  hymn: HymnListItem;
}

const HymnCardRow = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");
  const topic = useTopic(hymn.topic);

  return (
    <Link to={"/hymns/" + hymn.id}>
      <Card
        direction={"row"}
        bg={cardBgColor()}
        h={"100%"}
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
        <Show above="lg">
          <CardFooter justifyContent={"space-between"} minWidth={28}>
            <HStack justifyContent={"right"}>
              {hymn.pdf_file && <Icon as={FaFilePdf} boxSize={8} />}
              {hymn.audio_set?.length !== 0 && (
                <Icon as={RiFileMusicFill} boxSize={8} />
              )}
            </HStack>
          </CardFooter>
        </Show>
      </Card>
    </Link>
  );
};

export default HymnCardRow;
