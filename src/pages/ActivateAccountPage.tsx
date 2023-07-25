import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, LoaderFunctionArgs } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { layoutBgColor } from "../theme";
import AuthClient from "../services/auth-client";

const authClient = new AuthClient();

export const activationLoader = async ({ params }: LoaderFunctionArgs) => {
  await authClient
    .activate({ uid: params.uid, token: params.token })
    .then((res) => {
      if (res.status !== 204) throw new Response("Not Found", { status: 404 });
    })
    .catch((error) => {
      console.log(error);
      throw new Response("Not Found", { status: 404 });
    });
};

const ActivateAccountPage = () => {
  useDocumentTitle("Activation");
  return (
    <Box textAlign="center" py={10} px={6} bg={layoutBgColor()}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"teal.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={AiFillCheckCircle} boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading
        as="h2"
        size="xl"
        mt={6}
        mb={2}
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        backgroundClip="text"
      >
        Activation Successful!
      </Heading>
      <Text color={"gray.500"} my={5}>
        Pro favor inicie sesion para ver los cantos
      </Text>
      <Link to={"/login"}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          my={5}
        >
          Go to Login
        </Button>
      </Link>
    </Box>
  );
};

export default ActivateAccountPage;
