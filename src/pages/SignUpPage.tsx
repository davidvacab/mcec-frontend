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
import CountryNames, { CountryNameList } from "../entities/CountryNames";
import MemberRoles, { MemberRoleList } from "../entities/MemberRoles";
import MemberVoiceTypes, {
  MemberVoiceTypeList,
} from "../entities/MemberVoiceTypes";
import CountryPhoneCodes, {
  CountryPhoneCodeList,
} from "../entities/CountryPhoneCodes";
import { useNavigate } from "react-router-dom";
import useMainStore from "../store";
import { cardStyles, inputStyles, selectStyles } from "../theme/theme";
import useSignUp from "../hooks/useSignUp";
import { AxiosError } from "axios";
import UserSignUp from "../entities/UserSignUp";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { zodI18nMap } from "zod-i18n-map";

z.setErrorMap(zodI18nMap);

interface FormProps {
  register: UseFormRegister<UserSignUp>;
  errors: FieldErrors<UserSignUp>;
  t: TFunction;
}

const AccountForm = ({ register, errors, t }: FormProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack spacing={5} width={"100%"}>
      <FormControl isInvalid={errors.username !== undefined}>
        <FormLabel htmlFor="username" fontWeight={"normal"}>
          {t("member.username")}
        </FormLabel>
        <Input
          {...register("username")}
          {...inputStyles}
          id="username"
          autoComplete="username"
          tabIndex={1}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email !== undefined}>
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          {t("member.email")}
        </FormLabel>
        <Input
          {...register("email")}
          {...inputStyles}
          id="email"
          type="email"
          autoComplete="email"
          tabIndex={2}
        />
        <FormHelperText>{t("member.email_des")}</FormHelperText>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password !== undefined}>
        <FormLabel htmlFor="password" fontWeight={"normal"}>
          {t("member.password")}
        </FormLabel>
        <InputGroup>
          <Input
            {...register("password")}
            {...inputStyles}
            id="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            tabIndex={3}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>
              {show ? t("common:button.hide") : t("common:button.show")}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.re_password !== undefined}>
        <FormLabel htmlFor="re_password" fontWeight={"normal"}>
          {t("member.re_password")}
        </FormLabel>
        <InputGroup>
          <Input
            {...register("re_password")}
            {...inputStyles}
            id="re_password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            tabIndex={4}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>
              {show ? t("common:button.hide") : t("common:button.show")}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.re_password?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

const ProfileForm = ({ register, errors, t }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"} spacing={5}>
        <FormControl isInvalid={errors.profile?.first_name !== undefined}>
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            {t("member.first_name")}
          </FormLabel>
          <Input
            {...register("profile.first_name")}
            {...inputStyles}
            id="first-name"
            autoComplete="given-name"
            tabIndex={1}
          />
          <FormErrorMessage>
            {errors.profile?.first_name?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.profile?.last_name !== undefined}>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            {t("member.last_name")}
          </FormLabel>
          <Input
            {...register("profile.last_name")}
            {...inputStyles}
            id="last-name"
            autoComplete="family-name"
            tabIndex={2}
          />
          <FormErrorMessage>
            {errors.profile?.last_name?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isInvalid={errors.profile?.birthdate !== undefined}>
          <FormLabel htmlFor="birthdate" fontWeight={"normal"}>
            {t("member.birthdate")}
          </FormLabel>
          <Input
            {...register("profile.birthdate")}
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
          <FormErrorMessage>
            {errors.profile?.birthdate?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.profile?.phone_number !== undefined}>
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            {t("member.phone")}
          </FormLabel>
          <InputGroup>
            <InputLeftAddon p={0}>
              <Select
                {...register("profile.phone_area_code")}
                {...selectStyles}
                id="country-code"
                autoComplete="on"
                tabIndex={4}
                defaultValue="MX"
              >
                {CountryPhoneCodeList.map((code) => (
                  <option key={code.code} value={code.code}>
                    {code.dial_code}
                  </option>
                ))}
              </Select>
            </InputLeftAddon>
            <Input
              {...register("profile.phone_number")}
              {...inputStyles}
              type="tel"
              id="phone"
              pattern="[0-9]{8,10}"
              placeholder="3333333333"
              autoComplete="tel"
              tabIndex={5}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.profile?.phone_number?.message}
            {errors.profile?.phone_area_code?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isInvalid={errors.profile?.voice_type !== undefined}>
          <FormLabel htmlFor="voice" fontWeight={"normal"}>
            {t("member.voice")}
          </FormLabel>
          <Select
            id="voice"
            autoComplete="on"
            {...register("profile.voice_type")}
            {...selectStyles}
            tabIndex={6}
          >
            {MemberVoiceTypeList.map((voice) => (
              <option key={voice.key} value={voice.key}>
                {t(`member_voice.${voice.key}`)}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.profile?.voice_type?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.profile?.role !== undefined}>
          <FormLabel htmlFor="role" fontWeight={"normal"}>
            {t("member.role")}
          </FormLabel>
          <Select
            id="role"
            autoComplete="on"
            tabIndex={7}
            {...register("profile.role")}
            {...selectStyles}
          >
            {MemberRoleList.map((role) => (
              <option key={role.key} value={role.key}>
                {t(`member_role.${role.key}`)}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.profile?.role?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </VStack>
  );
};

const ChurchForm = ({ register, errors, t }: FormProps) => {
  return (
    <VStack spacing={5} w={"100%"}>
      <FormControl isInvalid={errors.church?.minister_name !== undefined}>
        <FormLabel htmlFor="minister">{t("member.minister_name")}</FormLabel>
        <Input
          type="text"
          id="minister"
          autoComplete="name"
          {...register("church.minister_name")}
          {...inputStyles}
          tabIndex={1}
        />
        <FormErrorMessage>
          {errors.church?.minister_name?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church?.church_name !== undefined}>
        <FormLabel htmlFor="church-name">{t("member.church_name")}</FormLabel>
        <Input
          type="text"
          id="church-name"
          autoComplete="organization"
          {...register("church.church_name")}
          {...inputStyles}
          tabIndex={2}
        />
        <FormErrorMessage>
          {errors.church?.church_name?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church?.city !== undefined}>
        <FormLabel htmlFor="city">{t("member.city")}</FormLabel>
        <Input
          type="text"
          id="city"
          autoComplete="address-level2"
          {...register("church.city")}
          {...inputStyles}
          tabIndex={3}
        />
        <FormErrorMessage>{errors.church?.city?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church?.state !== undefined}>
        <FormLabel htmlFor="state">{t("member.state")}</FormLabel>
        <Input
          type="text"
          id="state"
          autoComplete="address-level1"
          {...register("church.state")}
          {...inputStyles}
          tabIndex={4}
        />
        <FormErrorMessage>{errors.church?.state?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church?.country !== undefined}>
        <FormLabel htmlFor="country">{t("member.country")}</FormLabel>
        <Select
          id="country"
          autoComplete="country"
          {...register("church.country")}
          {...selectStyles}
          tabIndex={5}
          defaultValue="mx"
        >
          {CountryNameList.map((country) => (
            <option key={country.alpha3} value={country.alpha2}>
              {country.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.church?.country?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

const SignUpPage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:label.signup")} | MCEC`);
  const signUpSchema = z
    .object({
      profile: z.object({
        first_name: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        last_name: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        birthdate: z.string().nonempty(t("validation:required")),
        phone_area_code: z.enum([
          CountryPhoneCodes[0],
          ...CountryPhoneCodes.slice(0),
        ]),
        phone_number: z
          .string()
          .min(6, t("validation:min", { value: 6 }))
          .max(20, t("validation:max", { value: 20 }))
          .regex(RegExp("[0-9]{8,10}"), t("validation:phone")),
        voice_type: z.enum([MemberVoiceTypes[0], ...MemberVoiceTypes.slice(0)]),
        role: z.enum([MemberRoles[0], ...MemberRoles.slice(0)]),
      }),
      church: z.object({
        minister_name: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        church_name: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        city: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        state: z
          .string()
          .nonempty(t("validation:required"))
          .max(50, t("validation:max", { value: 50 })),
        country: z.enum([CountryNames[0], ...CountryNames.slice(0)]),
      }),
      username: z
        .string()
        .min(8, t("validation:min", { value: 8 }))
        .max(32, t("validation:max", { value: 32 }))
        .regex(RegExp("^[a-z0-9]*$"), t("validation:username")),
      email: z.string().email(),
      password: z
        .string()
        .min(8, t("validation:min", { value: 8 }))
        .max(32, t("validation:max", { value: 32 }))
        .regex(RegExp("[a-z]"), t("validation:password_low"))
        .regex(RegExp("[A-Z]"), t("validation:password_up"))
        .regex(RegExp("[0-9]"), t("validation:password_num"))
        .regex(RegExp("[!@#$%^&*()_+.-]"), t("validation:password_esp")),
      re_password: z.string().nonempty(t("validation:required")),
    })
    .partial()
    .refine((data) => data.password === data.re_password, {
      path: ["re_password"],
      message: t("validation:password_mat"),
    });
  const setRegistrationEmail = useMainStore((s) => s.setRegistrationEmail);
  const toast = useToast();
  const {
    handleSubmit,
    trigger,
    register,
    setError,
    formState: { errors },
  } = useForm<UserSignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: 3,
  });

  const navigate = useNavigate();
  const { mutate: singUp, isLoading } = useSignUp();

  const steps = [
    { title: t("common:label.profile"), description: t("member.personal") },
    { title: t("member.church"), description: t("member.local") },
    { title: t("member.user"), description: t("member.account") },
  ];

  const onSubmit = (userData: UserSignUp) => {
    singUp(userData, {
      onSuccess: (response) => {
        toast({
          title: t("common:label.success"),
          description: t("member.account_success"),
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
                { type: "value", message: t("member.email_used") },
                { shouldFocus: true }
              );
            if (error.response.data.username)
              setError(
                "username",
                { type: "value", message: t("member.username_used") },
                { shouldFocus: true }
              );
          } else {
            toast({
              title: t("common:label.error"),
              description: t("member.account_error"),
              status: "error",
              position: "top",
              duration: 9000,
              isClosable: true,
            });
          }
        }
      },
    });
  };

  const onNext = async () => {
    if (
      activeStep === 1 &&
      (await trigger(
        [
          "profile.first_name",
          "profile.last_name",
          "profile.birthdate",
          "profile.phone_area_code",
          "profile.phone_number",
          "profile.voice_type",
          "profile.role",
        ],
        {
          shouldFocus: true,
        }
      ))
    ) {
      setActiveStep(2);
    } else if (
      activeStep === 2 &&
      (await trigger(
        [
          "church.minister_name",
          "church.church_name",
          "church.city",
          "church.state",
          "church.country",
        ],
        {
          shouldFocus: true,
        }
      ))
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
        onSubmit={handleSubmit(onSubmit)}
        {...cardStyles}
      >
        <Heading>{t("common:label.signup")}</Heading>
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
          <ProfileForm register={register} errors={errors} t={t} />
        ) : activeStep === 2 ? (
          <ChurchForm register={register} errors={errors} t={t} />
        ) : (
          <AccountForm register={register} errors={errors} t={t} />
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
            {t("common:button.back")}
          </Button>
          <Button
            w="7rem"
            isDisabled={activeStep === 3}
            onClick={onNext}
            colorScheme="navy"
            variant="outline"
            tabIndex={8}
          >
            {t("common:button.next")}
          </Button>
          {activeStep === 3 ? (
            <Button type="submit" w="7rem" colorScheme="gold" variant="solid">
              {t("common:button.submit")}
            </Button>
          ) : null}
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;
