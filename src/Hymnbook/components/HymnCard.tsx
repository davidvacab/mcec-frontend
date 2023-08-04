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
import useTopics from "../hooks/useTopics";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");
  const topics = useTopics(hymn.topics);

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
              {hymn.topics.length > 2 ? "Temas:" : "Tema:"}
            </Heading>
            {topics.map((topic) => (
              <Text pt="1" fontSize="md" key={topic?.code}>
                {topic?.title}
              </Text>
            ))}
          </HStack>
          {hymn.authors?.length !== 0 && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                {hymn.authors?.length > 1 ? "Autores:" : "Autor:"}
              </Heading>
              {hymn.authors.map((author) => (
                <Text pt="1" fontSize="md" key={author.id}>
                  {`${author.first_name} ${author.last_name}`}
                </Text>
              ))}
            </HStack>
          )}
          {hymn.arrangers && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                Arreglista:
              </Heading>
              <Text pt="1" fontSize="md">
                {/* {hymn.arrangers.first_name + " " + hymn.arrangers.last_name} */}
              </Text>
            </HStack>
          )}
          <HStack>
            <Heading size="xs" textTransform="uppercase">
              Publicacion:
            </Heading>
            <Text pt="1" fontSize="md">
              {formattedDate}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HymnCard;
