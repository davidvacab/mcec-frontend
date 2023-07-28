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
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cardStyles, inputStyles } from "../theme/theme";
import useLogin from "../hooks/useLogin";

const schema = z.object({
  username: z.string().nonempty("Requerido"),
  password: z.string().nonempty("Requerido"),
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
  const { mutate: login, isLoading } = useLogin();

  const onSubmit = (credentials: FormData) => {
    login(credentials, {
      onSuccess: (response) => {
        if (
          signIn({
            token: response.data.access,
            expiresIn: 10,
            tokenType: "Bearer",
            authState: response.data.user,
            refreshToken: response.data.refresh,
            refreshTokenExpireIn: 1440,
          })
        )
          navigate(state !== null ? state.from : "/", { replace: true });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Invalid Credentials",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  if (isLoading) return <Spinner />;

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
        maxW={"md"}
        w={"100%"}
        p={{ base: 3, md: 10 }}
        onSubmit={handleSubmit((data) => onSubmit(data))}
        {...cardStyles}
      >
        <Heading>Iniciar Sesion</Heading>
        <FormControl id="username" isInvalid={errors.username !== undefined}>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            {...register("username")}
            {...inputStyles}
            autoComplete="username"
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={errors.password !== undefined}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            {...inputStyles}
            id="password"
            type="password"
            autoComplete="current-password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="10rem" colorScheme="gold">
          Sign in
        </Button>
        <HStack>
          <Link to="/password-reset">
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
