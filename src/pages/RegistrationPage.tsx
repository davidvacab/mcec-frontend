import { useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  FormHelperText,
  InputRightElement,
  Stack,
  VStack,
  InputLeftAddon,
  FormErrorMessage,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    firstName: z.string().nonempty("Requerido"),
    lastName: z.string().nonempty("Requerido"),
    email: z.string().email("Correo invalido"),
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
    birthdate: z.string().nonempty("Requerido"),
    phone: z
      .string()
      .min(6, "Debe ser al menos 8 numeros")
      .regex(RegExp("[0-9]{8,10}"), "Numero Invalido"),
    minister: z.string().nonempty("Requerido"),
    church: z.string().nonempty("Requerido"),
    city: z.string().nonempty("Requerido"),
    state: z.string().nonempty("Requerido"),
  })
  .partial()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

interface FormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const steps = [
  { title: "Usuario", description: "Cuenta" },
  { title: "Perfil", description: "Personal" },
  { title: "Iglesia", description: "Local" },
];

const Form1 = ({ register, errors }: FormProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack spacing={5} width={"100%"}>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"} spacing={5}>
        <FormControl isInvalid={errors.firstName !== undefined}>
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Nombre
          </FormLabel>
          <Input
            {...register("firstName")}
            id="first-name"
            placeholder="First name"
            autoComplete="given-name"
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName !== undefined}>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Apellido(s)
          </FormLabel>
          <Input
            {...register("lastName")}
            id="last-name"
            placeholder="Last name"
            autoComplete="family-name"
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl isInvalid={errors.email !== undefined}>
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          autoComplete="email"
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password !== undefined}>
        <FormLabel htmlFor="password1" fontWeight={"normal"}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("password")}
            id="password1"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="new-password"
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirmPassword !== undefined}>
        <FormLabel htmlFor="password2" fontWeight={"normal"}>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("confirmPassword")}
            id="password2"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            autoComplete="new-password"
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

const Form2 = ({ register, errors }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isInvalid={errors.birthdate !== undefined}>
          <FormLabel htmlFor="birthdate" fontWeight={"normal"}>
            Birthdate
          </FormLabel>
          <Input
            {...register("birthdate")}
            id="birthdate"
            type="text"
            placeholder="01/01/2001"
            autoComplete="bday"
            onFocus={(e) => (e.target.type = "date")}
          />
          <FormErrorMessage>{errors.birthdate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone !== undefined}>
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            Phone
          </FormLabel>
          <InputGroup>
            <InputLeftAddon p={0}>
              <Select margin={0} placeholder="123" />
            </InputLeftAddon>
            <Input
              {...register("phone")}
              type="tel"
              id="phone"
              pattern="[0-9]{8,10}"
              placeholder="3333333333"
              autoComplete="tel"
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl>
          <FormLabel htmlFor="voice" fontWeight={"normal"}>
            Voice
          </FormLabel>
          <Select id="voice" placeholder="Soprano 1" autoComplete="on" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="role" fontWeight={"normal"}>
            Role
          </FormLabel>
          <Select id="role" placeholder="Miembro" autoComplete="on" />
        </FormControl>
      </Stack>
    </VStack>
  );
};

const Form3 = ({ register, errors }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <FormControl isInvalid={errors.minister !== undefined}>
        <FormLabel htmlFor="minister">Ministro</FormLabel>
        <Input
          type="text"
          id="minister"
          autoComplete="name"
          {...register("minister")}
        />
        <FormErrorMessage>{errors.minister?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church !== undefined}>
        <FormLabel htmlFor="church-name">Nombre de Iglesia</FormLabel>
        <Input
          type="text"
          id="church-name"
          autoComplete="organization"
          {...register("church")}
        />
        <FormErrorMessage>{errors.church?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.city !== undefined}>
        <FormLabel htmlFor="city">Ciudad</FormLabel>
        <Input
          type="text"
          id="city"
          autoComplete="address-level2"
          {...register("city")}
        />
        <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.state !== undefined}>
        <FormLabel htmlFor="state">State / Province</FormLabel>
        <Input
          type="text"
          id="state"
          autoComplete="address-level1"
          {...register("state")}
        />
        <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="country">Country / Region</FormLabel>
        <Select id="country" autoComplete="country" placeholder="Select option">
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>
    </VStack>
  );
};

const RegistrationPage = () => {
  useDocumentTitle("Registracion | MCEC");
  const toast = useToast();
  const {
    handleSubmit,
    trigger,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const onSubmit = (formData: FormData) => {
    
  };

  const onNext = async () => {
    if (
      activeStep === 1 &&
      (await trigger(
        ["firstName", "lastName", "email", "password", "confirmPassword"],
        { shouldFocus: true }
      ))
    ) {
      setActiveStep(2);
    } else if (
      activeStep === 2 &&
      (await trigger(["birthdate", "phone"], { shouldFocus: true }))
    ) {
      setActiveStep(3);
    }
  };

  return (
    <Flex
      minH={"calc(100vh - 5rem)"}
      align={"center"}
      justify={"center"}
      px={1}
    >
      <VStack
        borderWidth="1px"
        spacing={10}
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        w={"100%"}
        p={6}
        as="form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <Heading>Registracion</Heading>
        <Stepper index={activeStep} width={"100%"}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        {activeStep === 1 ? (
          <Form1 register={register} errors={errors} />
        ) : activeStep === 2 ? (
          <Form2 register={register} errors={errors} />
        ) : (
          <Form3 register={register} errors={errors} />
        )}
        <ButtonGroup w="100%" mt={5} spacing={5}>
          <Button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            isDisabled={activeStep === 1}
            colorScheme="telegram"
            variant="solid"
            w="7rem"
          >
            Back
          </Button>
          <Button
            type="submit"
            w="7rem"
            isDisabled={activeStep === 3}
            onClick={onNext}
            colorScheme="telegram"
            variant="outline"
          >
            Next
          </Button>
          {activeStep === 3 ? (
            <Button
              type="submit"
              w="7rem"
              colorScheme="teal"
              variant="solid"
              //   onClick={() => {
              //     toast({
              //       title: "Account created.",
              //       description: "We've created your account for you.",
              //       status: "success",
              //       duration: 3000,
              //       isClosable: true,
              //     });
              //   }}
            >
              Submit
            </Button>
          ) : null}
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};

export default RegistrationPage;
