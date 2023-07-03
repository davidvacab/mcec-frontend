import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiFileMusicFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Hymn } from "../hooks/useHymns";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const date = new Date(hymn.release_date);

  const formattedDate = dayjs(date).locale("es").format("DD/MMMM/YY");

  return (
    <Card bg={useColorModeValue("gray.100", "gray.700")} h={"100%"}>
      <CardHeader textAlign={"center"}>
        <Heading size={"md"}>{hymn.title}</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack>
            <Heading size="xs" textTransform="uppercase">
              Tema:
            </Heading>
            <Text pt="1" fontSize="sm">
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
              Fecha de publicacion:
            </Heading>
            <Text pt="1" fontSize="sm">
              {formattedDate}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent={"space-between"}>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="teal"
            rightIcon={<AiOutlineArrowRight />}
          >
            Abrir
          </Button>
        </ButtonGroup>
        <HStack justifyContent={"right"}>
          {hymn.pdf_file && (
            <Icon as={FaFilePdf} color={"gray.500"} boxSize={8} />
          )}
          {hymn.audio_set.length !== 0 && (
            <Icon as={RiFileMusicFill} color={"gray.500"} boxSize={8} />
          )}
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default HymnCard;
