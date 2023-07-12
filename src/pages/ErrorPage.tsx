import { Box, Heading, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ErrorPage = () => {
  useDocumentTitle("Error");
  const error = useRouteError();

  if (isRouteErrorResponse(error)) return <NotFound />;

  return <Error />;
};

const Error = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={AiFillCloseCircle} boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Oops...
      </Heading>
      <Text color={"gray.500"} my={5}>
        Something went wrong, please go back to the home page.
      </Text>
      <Link to={"/"}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, red.400, red.500, red.600)"
          color="white"
          variant="solid"
          my={5}
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <Link to={"/"}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
