import {
  Button,
  ButtonGroup,
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
import { z } from "zod";
import useSetPassword from "../hooks/useSetPassword";
import { inputStyles } from "../theme/theme";
import SetPassword from "../entities/SetPassword";
import { useTranslation } from "react-i18next";

const PasswordChangeForm = () => {
  const { t } = useTranslation("members");

  const passwordSchema = z
    .object({
      current_password: z
        .string()
        .nonempty(t("validation:required"))
        .max(32, t("validation:max", { value: 32 })),
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
        path: ["re_new_password"],
        message: t("validation:password_mat"),
      }
    );

  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SetPassword>({
    resolver: zodResolver(passwordSchema),
  });
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const { mutate: setPassword, isLoading } = useSetPassword();

  const handleClick = () => setShow(!show);

  const onSubmit = (setPasswordData: SetPassword) => {
    setEdit(false);
    reset();
    setPassword(setPasswordData, {
      onSuccess: () => {
        toast({
          title: t("common:label.success"),
          description: t("set_password.success"),
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: t("common:label.error"),
          description: t("set_password.error"),
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
    <VStack
      spacing={5}
      width={"100%"}
      maxWidth={600}
      mx={"auto"}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl
        isInvalid={errors.current_password !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="current-password" fontWeight={"normal"}>
          {t("set_password.current_password")}
        </FormLabel>
        <InputGroup>
          <Input
            {...register("current_password")}
            {...inputStyles}
            id="current-password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            tabIndex={1}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? t("common:button.hide") : t("common:button.show")}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.current_password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.new_password !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="new-password" fontWeight={"normal"}>
          {t("set_password.new_password")}
        </FormLabel>
        <InputGroup>
          <Input
            {...register("new_password")}
            {...inputStyles}
            id="new-password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            tabIndex={2}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? t("common:button.hide") : t("common:button.show")}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.new_password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.re_new_password !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
          {t("set_password.re_new_password")}
        </FormLabel>
        <InputGroup>
          <Input
            {...register("re_new_password")}
            {...inputStyles}
            id="confirm-password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            tabIndex={3}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? t("common:button.hide") : t("common:button.show")}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.re_new_password?.message}</FormErrorMessage>
      </FormControl>

      {!edit ? (
        <Button
          w="7rem"
          colorScheme="gold"
          variant="solid"
          tabIndex={4}
          onClick={() => setEdit(true)}
        >
          {t("common:button.edit")}
        </Button>
      ) : (
        <ButtonGroup spacing={5}>
          <Button
            type="submit"
            w="7rem"
            colorScheme="gold"
            variant="solid"
            tabIndex={4}
          >
            {t("common:button.save")}
          </Button>
          <Button
            w="7rem"
            colorScheme="red"
            variant="solid"
            tabIndex={4}
            onClick={() => {
              setShow(false);
              setEdit(false);
              reset();
            }}
          >
            {t("common:button.cancel")}
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default PasswordChangeForm;
