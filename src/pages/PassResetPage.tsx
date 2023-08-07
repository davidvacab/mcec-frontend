import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { cardStyles, inputStyles } from "../theme/theme";
import useResetPassword from "../hooks/useResetPassword";
import { zodI18nMap } from "zod-i18n-map";
import { useTranslation } from "react-i18next";

z.setErrorMap(zodI18nMap);

const PassResetPage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:page.password_reset")} | MCEC`);
  const schema = z.object({
    email: z.string().email(),
  });
  type emailData = z.infer<typeof schema>;
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailData>({
    resolver: zodResolver(schema),
  });
  const { mutate: requestReset, isLoading, error } = useResetPassword();

  const onSubmit = (data: emailData) => {
    requestReset(data.email, {
      onSettled: () => {
        toast({
          title: t("common:label.success"),
          description: t("password_reset.request_des"),
          status: "info",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login", { replace: true });
      },
    });
  };

  if (isLoading) return <Spinner />;

  if (error) throw error;

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
        onSubmit={handleSubmit(onSubmit)}
        {...cardStyles}
      >
        <Heading>{t("password_reset.heading")}</Heading>
        <FormControl isInvalid={errors.email !== undefined}>
          <FormLabel htmlFor="email">{t("member.email")}</FormLabel>
          <Input
            id="email"
            {...register("email")}
            {...inputStyles}
            autoComplete="email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="10rem" colorScheme="gold">
          {t("common:button.submit")}
        </Button>
      </VStack>
    </Flex>
  );
};

export default PassResetPage;
