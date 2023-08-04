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
import SetPassword from "../entities/SetPassword";

const passwordSchema = z
  .object({
    current_password: z.string().nonempty("Requerido"),
    new_password: z
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
    re_new_password: z.string().nonempty("Requerido"),
  })
  .refine(
    ({ new_password, re_new_password }) => new_password === re_new_password,
    {
      message: "Passwords dont match",
      path: ["confirmPassword"],
    }
  );

const PasswordChangeForm = () => {
  useDocumentTitle("Registracion | MCEC");
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
          title: "Success",
          description: "Password Changed",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Update Failed",
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
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FormControl
        isInvalid={errors.current_password !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="current-password" fontWeight={"normal"}>
          Current Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("current_password")}
            {...inputStyles}
            id="current-password"
            type={show ? "text" : "password"}
            placeholder="Enter Current password"
            autoComplete="current-password"
            tabIndex={1}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? "Hide" : "Show"}
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
          New Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("new_password")}
            {...inputStyles}
            id="new-password"
            type={show ? "text" : "password"}
            placeholder="Enter New password"
            autoComplete="new-password"
            tabIndex={2}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} isDisabled={!edit}>
              {show ? "Hide" : "Show"}
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
          Confirm New Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("re_new_password")}
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
              reset();
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
