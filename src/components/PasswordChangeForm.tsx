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
import useDocumentTitle from "../hooks/useDocumentTitle";
import useSetPassword from "../hooks/useSetPassword";
import { inputStyles } from "../theme/theme";

const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty("Requerido"),
    newPassword: z
      .string()
      .min(8, "Debe ser al menos 8 caracteres")
      .max(32, "Maximo 32 caracteres")
      .regex(RegExp("[a-z]"), "Must contain one lowercase letter.")
      .regex(RegExp("[A-Z]"), "Must contain one uppercase letter.")
      .regex(RegExp("[0-9]"), "Must contain one number.")
      .regex(
        RegExp("[!@#$%^&*()_+.-]"),
        "Must contain one special character ( !@#$%^&*()_+.- )."
      ),
    confirmNewPassword: z.string().nonempty("Requerido"),
  })
  .refine(
    ({ newPassword: password, confirmNewPassword: confirmPassword }) =>
      password === confirmPassword,
    {
      message: "Passwords dont match",
      path: ["confirmPassword"],
    }
  );

type PasswordData = z.infer<typeof passwordSchema>;

const PasswordChangeForm = () => {
  useDocumentTitle("Registracion | MCEC");
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  });
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const { mutate: setPassword, error, isLoading } = useSetPassword();

  const handleClick = () => setShow(!show);

  const onSubmit = (formData: PasswordData) => {
    setPassword(
      {
        new_password: formData.newPassword,
        current_password: formData.currentPassword,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Password Changed",
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          setEdit(false);
        },
      }
    );
  };

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <VStack
      spacing={5}
      width={"100%"}
      maxWidth={600}
      mx={"auto"}
      as="form"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FormControl
        isInvalid={errors.currentPassword !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="current-password" fontWeight={"normal"}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("currentPassword")}
            {...inputStyles}
            id="current-password"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="current-password"
            tabIndex={1}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.newPassword !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="new-password" fontWeight={"normal"}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("newPassword")}
            {...inputStyles}
            id="new-password"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="new-password"
            tabIndex={2}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.confirmNewPassword !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
          Confirm New Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("confirmNewPassword")}
            {...inputStyles}
            id="confirm-password"
            type={show ? "text" : "password"}
            placeholder="Confirm New password"
            autoComplete="new-password"
            tabIndex={3}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.confirmNewPassword?.message}
        </FormErrorMessage>
      </FormControl>

      {!edit ? (
        <Button
          w="7rem"
          colorScheme="gold"
          variant="solid"
          tabIndex={4}
          onClick={() => setEdit(true)}
        >
          Editar
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
            Guardar
          </Button>
          <Button
            w="7rem"
            colorScheme="red"
            variant="solid"
            tabIndex={4}
            onClick={() => {
              setShow(false);
              setEdit(false);
            }}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default PasswordChangeForm;
