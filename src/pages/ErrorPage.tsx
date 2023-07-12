import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ErrorPage = () => {
  useDocumentTitle("Error")
  const error = useRouteError();
  return (
    <Box padding={5}>
      <Heading>Oops</Heading>
      <Text>
        {isRouteErrorResponse(error)
          ? "This page does not exists."
          : "An unexpected error occured."}
      </Text>
    </Box>
  );
};

export default ErrorPage;
