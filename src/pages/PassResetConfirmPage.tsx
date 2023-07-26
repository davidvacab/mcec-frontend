import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import AuthClient from "../services/auth-client";
import { cardStyles, inputStyles } from "../theme/theme";

const authClient = new AuthClient();

const schema = z
  .object({
    password: z
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
    confirmPassword: z.string().nonempty("Requerido"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const PassResetConfirmPage = () => {
  const params = useParams();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = ({ password }: FormData) => {
    const resetPassData = {
      uid: params.uid,
      token: params.token,
      new_password: password,
    };
    authClient
      .resetPasswordConfirmation(resetPassData)
      .then((res) => {
        if (res.status === 204) {
          toast({
            title: "Suceess",
            description: "Password Resetted",
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/");
        } else {
          throw new Response("Not Found", { status: 404 });
        }
      })
      .catch(() => {
        throw new Response("Not Found", { status: 404 });
      });
  };

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
        <FormControl isInvalid={errors.password !== undefined}>
          <FormLabel htmlFor="password" fontWeight={"normal"}>
            New Password
          </FormLabel>
          <InputGroup>
            <Input
              {...register("password")}
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
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword !== undefined}>
          <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
            Confirm New Password
          </FormLabel>
          <InputGroup>
            <Input
              {...register("confirmPassword")}
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
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
