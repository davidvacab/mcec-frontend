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
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import countriesES from "../entities/countries.es";
import memberRoles from "../entities/memberRoles";
import memberVoices from "../entities/memberVoices";
import phoneCountryCodes from "../entities/phoneCountryCodes";
import { useNavigate } from "react-router-dom";
import useMainStore from "../store";
import { cardStyles, inputStyles, selectStyles } from "../theme/theme";
import useSignUp from "../hooks/useSignUp";
import { AxiosError } from "axios";

const signUpSchema = z
  .object({
    firstName: z.string().nonempty("Requerido").max(50),
    lastName: z.string().nonempty("Requerido").max(50),
    username: z
      .string()
      .nonempty("Requerido")
      .min(8, "Debe ser al menos 8 letras")
      .max(32, "Maximo 32 letras")
      .regex(RegExp("^[a-z0-9]*$"), "Solo letras minusculas y numeros"),
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
    areaCode: z.enum([
      phoneCountryCodes[0].dial_code,
      ...phoneCountryCodes.slice(0).map((code) => code.dial_code),
    ]),
    phone: z
      .string()
      .min(6, "Debe ser al menos 8 numeros")
      .regex(RegExp("[0-9]{8,10}"), "Numero Invalido"),
    voice: z.enum([
      memberVoices[0].key,
      ...memberVoices.slice(0).map((voice) => voice.key),
    ]),
    role: z.enum([
      memberRoles[0].key,
      ...memberRoles.slice(0).map((role) => role.key),
    ]),
    minister: z.string().nonempty("Requerido"),
    church: z.string().nonempty("Requerido"),
    city: z.string().nonempty("Requerido"),
    state: z.string().nonempty("Requerido"),
    country: z.enum([
      countriesES[0].alpha2,
      ...countriesES.slice(0).map((country) => country.alpha2),
    ]),
  })
  .partial()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

interface FormProps {
  register: UseFormRegister<SignUpData>;
  errors: FieldErrors<SignUpData>;
}

const steps = [
  { title: "Perfil", description: "Personal" },
  { title: "Iglesia", description: "Local" },
  { title: "Usuario", description: "Cuenta" },
];

const AccountForm = ({ register, errors }: FormProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack spacing={5} width={"100%"}>
      <FormControl isInvalid={errors.username !== undefined}>
        <FormLabel htmlFor="username" fontWeight={"normal"}>
          Usuario
        </FormLabel>
        <Input
          {...register("username")}
          {...inputStyles}
          id="username"
          placeholder="Usuario"
          autoComplete="username"
          tabIndex={1}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email !== undefined}>
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          {...register("email")}
          {...inputStyles}
          id="email"
          type="email"
          placeholder="Correo"
          autoComplete="email"
          tabIndex={2}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password !== undefined}>
        <FormLabel htmlFor="password" fontWeight={"normal"}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("password")}
            {...inputStyles}
            id="password"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="new-password"
            tabIndex={3}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirmPassword !== undefined}>
        <FormLabel htmlFor="confirm-password" fontWeight={"normal"}>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            {...register("confirmPassword")}
            {...inputStyles}
            id="confirm-password"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            autoComplete="new-password"
            tabIndex={4}
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

const ProfileForm = ({ register, errors }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"} spacing={5}>
        <FormControl isInvalid={errors.firstName !== undefined}>
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Nombre
          </FormLabel>
          <Input
            {...register("firstName")}
            {...inputStyles}
            id="first-name"
            placeholder="First name"
            autoComplete="given-name"
            tabIndex={1}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName !== undefined}>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Apellido(s)
          </FormLabel>
          <Input
            {...register("lastName")}
            {...inputStyles}
            id="last-name"
            placeholder="Last name"
            autoComplete="family-name"
            tabIndex={2}
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isInvalid={errors.birthdate !== undefined}>
          <FormLabel htmlFor="birthdate" fontWeight={"normal"}>
            Birthdate
          </FormLabel>
          <Input
            {...register("birthdate")}
            {...inputStyles}
            id="birthdate"
            type="text"
            autoComplete="on"
            placeholder="01/01/2001"
            onFocus={(e) => {
              e.target.type = "date";
              e.target.autocomplete = "bday";
            }}
            tabIndex={3}
          />
          <FormErrorMessage>{errors.birthdate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone !== undefined}>
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            Phone
          </FormLabel>
          <InputGroup>
            <InputLeftAddon p={0}>
              <Select
                {...register("areaCode")}
                {...selectStyles}
                id="country-code"
                autoComplete="on"
                tabIndex={4}
              >
                {phoneCountryCodes.map((code) => (
                  <option key={code.code} value={code.dial_code}>
                    {code.dial_code}
                  </option>
                ))}
              </Select>
            </InputLeftAddon>
            <Input
              {...register("phone")}
              {...inputStyles}
              type="tel"
              id="phone"
              pattern="[0-9]{8,10}"
              placeholder="3333333333"
              autoComplete="tel"
              tabIndex={5}
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
          <Select
            id="voice"
            autoComplete="on"
            {...register("voice")}
            {...selectStyles}
            tabIndex={6}
          >
            {memberVoices.map((voice) => (
              <option key={voice.key} value={voice.key}>
                {voice.value}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="role" fontWeight={"normal"}>
            Role
          </FormLabel>
          <Select
            id="role"
            autoComplete="on"
            tabIndex={7}
            {...register("role")}
            {...selectStyles}
          >
            {memberRoles.map((role) => (
              <option key={role.key} value={role.key}>
                {role.value}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </VStack>
  );
};

const ChurchForm = ({ register, errors }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <FormControl isInvalid={errors.minister !== undefined}>
        <FormLabel htmlFor="minister">Ministro</FormLabel>
        <Input
          type="text"
          id="minister"
          autoComplete="name"
          {...register("minister")}
          {...inputStyles}
          tabIndex={1}
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
          {...inputStyles}
          tabIndex={2}
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
          {...inputStyles}
          tabIndex={3}
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
          {...inputStyles}
          tabIndex={4}
        />
        <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="country">Country / Region</FormLabel>
        <Select
          id="country"
          autoComplete="country"
          {...register("country")}
          {...selectStyles}
          tabIndex={5}
        >
          {countriesES.map((country) => (
            <option key={country.alpha3} value={country.alpha2}>
              {country.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </VStack>
  );
};

const SignUpPage = () => {
  useDocumentTitle("Registracion | MCEC");
  const setRegistrationEmail = useMainStore((s) => s.setRegistrationEmail);
  const toast = useToast();
  const {
    handleSubmit,
    trigger,
    register,
    setError,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const navigate = useNavigate();
  const { mutate: registrate, isLoading } = useSignUp();

  const onSubmit = (formData: SignUpData) => {
    const userObject = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      profile: {
        birth_date: formData.birthdate,
        phone: `${formData.areaCode} ${formData.phone}`,
        voice: formData.voice,
        role: formData.role,
      },
      church: {
        current_minister_name: formData.minister,
        church_name: formData.church,
        city: formData.city,
        state: formData.state,
        country: formData.country?.toUpperCase(),
      },
    };
    registrate(userObject, {
      onSuccess: (response) => {
        toast({
          title: "Suceess",
          description: "Account Created",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setRegistrationEmail(response.data.email);
        navigate("/activate-account");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            if (error.response.data.email)
              setError(
                "email",
                { type: "value", message: "Email already in use" },
                { shouldFocus: true }
              );
            if (error.response.data.username)
              setError(
                "username",
                { type: "value", message: "Username already in use" },
                { shouldFocus: true }
              );
          } else {
            console.log(error.response);
          }
        }
      },
    });
  };

  const onNext = async () => {
    if (
      activeStep === 1 &&
      (await trigger(["firstName", "lastName", "birthdate", "phone"], {
        shouldFocus: true,
      }))
    ) {
      setActiveStep(2);
    } else if (
      activeStep === 2 &&
      (await trigger(["minister", "church", "city", "state"], {
        shouldFocus: true,
      }))
    ) {
      setActiveStep(3);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Flex
      minH={"calc(100vh - 5rem)"}
      align={"center"}
      justify={"center"}
      px={1}
    >
      <VStack
        spacing={10}
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        w={"100%"}
        p={6}
        as="form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        {...cardStyles}
      >
        <Heading>Registracion</Heading>
        <Stepper index={activeStep} width={"100%"} colorScheme="navy">
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
          <ProfileForm register={register} errors={errors} />
        ) : activeStep === 2 ? (
          <ChurchForm register={register} errors={errors} />
        ) : (
          <AccountForm register={register} errors={errors} />
        )}
        <ButtonGroup w="100%" mt={5} spacing={5}>
          <Button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            isDisabled={activeStep === 1}
            colorScheme="navy"
            variant="solid"
            w="7rem"
          >
            Back
          </Button>
          <Button
            w="7rem"
            isDisabled={activeStep === 3}
            onClick={onNext}
            colorScheme="navy"
            variant="outline"
            tabIndex={8}
          >
            Next
          </Button>
          {activeStep === 3 ? (
            <Button
              type="submit"
              w="7rem"
              colorScheme="gold"
              variant="solid"
              tabIndex={9}
            >
              Submit
            </Button>
          ) : null}
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;