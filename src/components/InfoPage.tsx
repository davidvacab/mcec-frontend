import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  AiFillCloseCircle,
  AiFillCheckCircle,
  AiFillInfoCircle,
} from "react-icons/ai";
import { layoutBgColor } from "../theme";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

interface Props {
  title: string;
  description: string;
  variant?: "error" | "info" | "success";
  button2?: boolean;
  button2Text?: string;
  button2OnClick?: () => void;
}

const InfoPage = ({
  title,
  description,
  variant = "success",
  button2 = false,
  button2Text,
  button2OnClick,
}: Props) => {
  useDocumentTitle(title);
  let icon;
  let color;
  switch (variant) {
    case "error":
      icon = AiFillCloseCircle;
      color = "red";
      break;
    case "info":
      icon = AiFillInfoCircle;
      color = "blue";
      break;
    case "success":
      icon = AiFillCheckCircle;
      color = "teal";
      break;
  }
  return (
    <Box textAlign="center" py={10} px={6} bg={layoutBgColor()} minH={"100vh"}>
      <Box>
        <Flex
          mx={"auto"}
          justifyContent="center"
          alignItems="center"
          bgGradient={"linear(to-r, " + color + ".400, " + color + ".700)"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={icon} boxSize={"40px"} color={"white"} />
        </Flex>
      </Box>
      <Heading
        maxW={"fit-content"}
        mx={"auto"}
        my={10}
        size="3xl"
        backgroundClip="text"
        bgGradient={"linear(to-r, " + color + ".400, " + color + ".700)"}
      >
        {title}
      </Heading>
      <Text color={"gray.500"} my={5}>
        {description}
      </Text>
      <HStack spacing={10} my={5} justifyContent={"center"}>
        <Link to={"/"}>
          <Button
            colorScheme={color}
            bgGradient={
              "linear(to-r, " +
              color +
              ".400, " +
              color +
              ".500, " +
              color +
              ".700)"
            }
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </Link>
        {button2 && (
          <Button
            colorScheme={color}
            bgGradient={
              "linear(to-r, " +
              color +
              ".400, " +
              color +
              ".500, " +
              color +
              ".600)"
            }
            color="white"
            variant="solid"
            onClick={button2OnClick}
          >
            {button2Text}
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default InfoPage;
