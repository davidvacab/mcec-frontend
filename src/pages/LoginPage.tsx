import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthClient from "../services/auth-client";
import { buttonTextColor } from "../theme";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useLocation, useNavigate, Link } from "react-router-dom";

const authClient = new AuthClient();

const schema = z.object({
  username: z.string().min(5, {
    message: "El nombre de usuario debe de ser al menos 5 caracteres",
  }),
  password: z
    .string()
    .min(8, { message: "La contrasena tiene que ser al menos 8 caracteres" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  useDocumentTitle("Iniciar Sesion | MCEC");
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (formData: FormData) => {
    authClient
      .login(formData)
      .then((data) => {
        if (
          signIn({
            token: data.access,
            expiresIn: 10,
            tokenType: "Bearer",
            authState: data.user,
            refreshToken: data.refresh,
            refreshTokenExpireIn: 1440,
          })
        ) {
          navigate(state.from ? state.from : "/", { replace: true });
        } else throw new Error("Auth failed");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Invalid Credentials",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
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
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        spacing={5}
        maxW={"lg"}
        w={"100%"}
        p={6}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <Heading>Iniciar Sesion</Heading>
        <FormControl
          id="username"
          isRequired
          isInvalid={errors.username !== undefined}
        >
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            {...register("username")}
            autoComplete="username"
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={errors.password !== undefined}
        >
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            autoComplete="current-password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          w="7rem"
          colorScheme="telegram"
          color={buttonTextColor()}
        >
          Sign in
        </Button>
        <HStack>
          <Link to="#" color={"blue.400"}>
            <Button variant={"link"}>Forgot password?</Button>
          </Link>
        </HStack>
        <HStack>
          <Text>No tienes cuenta?</Text>
          <Link to={"/register"}>
            <Button variant={"link"}>Registrate</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
