import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthClient from "../services/auth-client";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { cardStyles, inputStyles } from "../theme/theme";

const authClient = new AuthClient();

const schema = z.object({
  email: z.string().email("Correo invalido"),
});

type FormData = z.infer<typeof schema>;

const PassResetPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  useDocumentTitle("Password Reset | MCEC");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (formData: FormData) => {
    authClient.resetPassword(formData.email).catch((error) => {
      console.log(error);
      throw new Response("Not Found", { status: 404 });
    });
    toast({
      title: "Request sent",
      description: "You will recieve an email shortly if an account exists",
      status: "info",
      position: "top",
      duration: 9000,
      isClosable: true,
    });
    navigate("/login", { replace: true });
  };

  return (
    <Flex
      minH={"calc(100vh - 5rem)"}
      justify={"center"}
      align={"center"}
      px={1}
    >
      <VStack
        as={"form"}
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        spacing={8}
        maxW={"lg"}
        w={"100%"}
        p={{ base: 3, md: 10 }}
        onSubmit={handleSubmit((data) => onSubmit(data))}
        {...cardStyles}
      >
        <Heading>Password Reset</Heading>
        <FormControl id="username" isInvalid={errors.email !== undefined}>
          <FormLabel>Email</FormLabel>
          <Input
            id="username"
            {...register("email")}
            {...inputStyles}
            autoComplete="username"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="10rem" colorScheme="gold">
          Request
        </Button>
      </VStack>
    </Flex>
  );
};

export default PassResetPage;
