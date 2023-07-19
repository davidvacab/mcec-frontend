import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthClient from "../services/auth-client";
import { cardBgColor, layoutBgColor } from "../theme";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useMainStore from "../store";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

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
  const { state } = useLocation();
  const { from } = state;
  const navigate = useNavigate();
  const setAlertElemnts = useMainStore((s) => s.setAlertElements);
  const openAlert = useMainStore((s) => s.openAlert);
  useDocumentTitle("Iniciar Sesion | MCEC");
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const inputBgColor = useColorModeValue("gray.300", "gray.600");
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
        )
          navigate(from ? from : "/", { replace: true });
        else throw new Error("Auth failed");
      })
      .catch((error: Error) => {
        console.log(error);
        setAlertElemnts("error", "Error", "Wrong Credentials");
        openAlert();
      });
  };

  return (
    <Flex
      minH={"calc(100vh - 20)"}
      align={"center"}
      justify={"center"}
      bg={layoutBgColor()}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={cardBgColor()} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Stack spacing={4}>
              <FormControl
                id="username"
                isRequired
                isInvalid={errors.username !== undefined}
              >
                <FormLabel>Username</FormLabel>
                <Input {...register("username")} bg={inputBgColor} />
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
                  type="password"
                  bg={inputBgColor}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox bg={inputBgColor}>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
