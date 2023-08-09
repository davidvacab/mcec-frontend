import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import LoginCredentials from "../entities/LoginCredentials";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useLogin from "../hooks/useLogin";
import { usePersistStore } from "../store";
import { cardStyles, inputStyles } from "../theme/theme";

const LoginPage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:label.signin")} | MCEC`);
  const schema = z.object({
    username: z.string().nonempty(t("validation:required")),
    password: z.string().nonempty(t("validation:required")),
  });
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const setProfile = usePersistStore((s) => s.setProfile);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(schema),
  });
  const { mutate: login, isLoading } = useLogin();

  const onSubmit = (credentials: LoginCredentials) => {
    login(credentials, {
      onSuccess: (response) => {
        if (
          signIn({
            token: response.data.access,
            expiresIn: 15,
            tokenType: "Bearer",
            authState: response.data.user,
            refreshToken: response.data.refresh,
            refreshTokenExpireIn: 1440,
          })
        ) {
          setProfile(response.data.user.profile);
          navigate(state !== null ? state.from : "/", { replace: true });
        }
      },
      onError: () => {
        resetField("password");
        toast({
          title: "Error",
          description: t("login.inv_cred"),
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
        onSubmit={handleSubmit(onSubmit)}
        {...cardStyles}
      >
        <Heading>{t("common:label.signin")}</Heading>
        <FormControl id="username" isInvalid={errors.username !== undefined}>
          <FormLabel>{t("member.username")}</FormLabel>
          <Input
            id="username"
            {...register("username")}
            {...inputStyles}
            autoComplete="username"
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={errors.password !== undefined}>
          <FormLabel>{t("member.password")}</FormLabel>
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
          {t("common:label.signin")}
        </Button>
        {/* <HStack>
          <Link to="/password-reset">
            <Button variant={"link"}>{t("login.forgot-password")}</Button>
          </Link>
        </HStack> */}
        <HStack>
          <Text>{t("login.need-account")}</Text>
          <Link to={"/register"}>
            <Button variant={"link"}>{t("login.signup")}</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
