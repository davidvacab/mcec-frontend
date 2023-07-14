import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Hymn } from "../entities/Hymn";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);
  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");

  return (
    <Card
      w={"100%"}
      h={"100%"}
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius={10}
      borderWidth={2}
      borderColor={useColorModeValue("blue.700", "blue.900")}
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
      <CardBody>
        <Stack
          divider={
            <StackDivider
              borderColor={useColorModeValue("blue.700", "blue.900")}
            />
          }
          spacing="4"
          justifyContent={"right"}
        >
          <HStack align={"center"}>
            <Heading size="sm" textTransform="uppercase">
              Tema:
            </Heading>
            <Text pt="1" fontSize="md">
              {hymn.topic.title}
            </Text>
          </HStack>
          {hymn.author && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                Autor:
              </Heading>
              <Text pt="1" fontSize="sm">
                {hymn.author.first_name + " " + hymn.author.last_name}
              </Text>
            </HStack>
          )}
          {hymn.arranger && (
            <HStack>
              <Heading size="xs" textTransform="uppercase">
                Arreglista:
              </Heading>
              <Text pt="1" fontSize="sm">
                {hymn.arranger.first_name + " " + hymn.arranger.last_name}
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
