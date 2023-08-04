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

const resetPassSchema = z
  .object({
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

type PasswordData = z.infer<typeof resetPassSchema>;

const PassResetConfirmPage = () => {
  const { uid, token } = useParams();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(resetPassSchema),
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { mutate: confirmPass, isLoading } = useResetPassConfirm();

  const handleClick = () => setShow(!show);

  const onSubmit = (passwordData: PasswordData) => {
    confirmPass(
      {
        uid: uid,
        token: token,
        ...passwordData,
      },
      {
        onSuccess: () => {
          toast({
            title: "Suceess",
            description: "Password Resetted",
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/", { replace: true });
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
        onSubmit={handleSubmit((data) => onSubmit(data))}
        {...cardStyles}
      >
        <FormControl isInvalid={errors.new_password !== undefined}>
          <FormLabel htmlFor="password" fontWeight={"normal"}>
            New Password
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
              <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.new_password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.re_new_password !== undefined}>
          <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
            Confirm New Password
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
              <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
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
          Submit
        </Button>
      </VStack>
    </Flex>
  );
};

export default PassResetConfirmPage;
