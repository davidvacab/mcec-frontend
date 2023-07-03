import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Hymn } from "../../hooks/useHymns";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);

  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");

  return (
    <Card borderRadius={10} overflow={"hidden"} bg={useColorModeValue("gray.100", "gray.700")}>
      <CardHeader>
        <Heading size={"md"}>{hymn.title}</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Tema
            </Heading>
            <Text pt="2" fontSize="sm">
              {hymn.topic.title}
            </Text>
          </Box>
          {hymn.author && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Autor
              </Heading>
              <Text pt="2" fontSize="sm">
                {hymn.author.first_name + " " + hymn.author.last_name}
              </Text>
            </Box>
          )}
          {hymn.arranger && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Arreglista
              </Heading>
              <Text pt="2" fontSize="sm">
                {hymn.arranger.first_name + " " + hymn.arranger.last_name}
              </Text>
            </Box>
          )}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Fecha de publicacion
            </Heading>
            <Text pt="2" fontSize="sm">
              {formattedDate}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Abrir
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default HymnCard;
