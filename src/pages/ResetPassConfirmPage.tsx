import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { cardStyles, inputStyles } from "../theme/theme";
import useResetPassConfirm from "../hooks/useResetPassConfirm";
import { useTranslation } from "react-i18next";
import ResetPasswordConfirm from "../entities/ResetPassConfirm";
import useDocumentTitle from "../hooks/useDocumentTitle";

const PassResetConfirmPage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:page.password_reset")} | MCEC`);
  const resetPassSchema = z
    .object({
      new_password: z
        .string()
        .min(8, t("validation:min", { value: 8 }))
        .max(32, t("validation:max", { value: 32 }))
        .regex(RegExp("[a-z]"), t("validation:password_low"))
        .regex(RegExp("[A-Z]"), t("validation:password_up"))
        .regex(RegExp("[0-9]"), t("validation:password_num"))
        .regex(RegExp("[!@#$%^&*()_+.-]"), t("validation:password_esp")),
      re_new_password: z.string().nonempty(t("validation:required")),
    })
    .refine(
      ({ new_password, re_new_password }) => new_password === re_new_password,
      {
        message: t("validation:password_mat"),
        path: ["re_new_password"],
      }
    );
  const { uid, token } = useParams();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordConfirm>({
    resolver: zodResolver(resetPassSchema),
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { mutate: confirmPass, isLoading } = useResetPassConfirm();

  const handleClick = () => setShow(!show);

  const onSubmit = (passwordData: ResetPasswordConfirm) => {
    confirmPass(
      {
        uid: uid,
        token: token,
        ...passwordData,
      },
      {
        onSuccess: () => {
          toast({
            title: t("common:label.success"),
            description: t("password_reset.success"),
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/", { replace: true });
        },
        onError: () => {
          toast({
            title: t("common:label.error"),
            description: t("password_reset.error"),
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/", { replace: true });
        },
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <Flex minH={"calc(100vh - 5rem)"} justify={"center"} px={1}>
      <VStack
        marginTop={5}
        spacing={5}
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        h={"100%"}
        width={"100%"}
        maxW={600}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        {...cardStyles}
      >
        <FormControl isInvalid={errors.new_password !== undefined}>
          <FormLabel htmlFor="password" fontWeight={"normal"}>
            {t("set_password.new_password")}
          </FormLabel>
          <InputGroup>
            <Input
              {...register("new_password")}
              id="password"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              autoComplete="new-password"
              tabIndex={3}
              {...inputStyles}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={handleClick}>
                {show ? t("common:button.hide") : t("common:button.show")}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.new_password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.re_new_password !== undefined}>
          <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
            {t("set_password.re_new_password")}
          </FormLabel>
          <InputGroup>
            <Input
              {...register("re_new_password")}
              id="confirm-password"
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              tabIndex={4}
              {...inputStyles}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={handleClick}>
                {show ? t("common:button.hide") : t("common:button.show")}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.re_new_password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          w="7rem"
          colorScheme="gold"
          variant="solid"
          tabIndex={9}
        >
          {t("common:button.submit")}
        </Button>
      </VStack>
    </Flex>
  );
};

export default PassResetConfirmPage;
