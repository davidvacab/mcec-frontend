import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  Stack,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MemberRoles, { MemberRoleList } from "../entities/MemberRoles";
import MemberVoiceTypes, {
  MemberVoiceTypeList,
} from "../entities/MemberVoiceTypes";
import CountryPhoneCodes, {
  CountryPhoneCodeList,
} from "../entities/CountryPhoneCodes";
import { inputStyles, selectStyles } from "../theme/theme";
import { useState } from "react";
import useProfile, { useProfileUpdate } from "../hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import Profile from "../entities/Profile";
import { useTranslation } from "react-i18next";
import { zodI18nMap } from "zod-i18n-map";

z.setErrorMap(zodI18nMap);

const MB_BYTES = 1000000;

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];

const ProfileForm = () => {
  const { t } = useTranslation("members");
  const profileSchema = z.object({
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
    bio: z
      .string()
      .max(250, t("validation:max", { value: 250 }))
      .optional(),
    profile_picture: z.instanceof(FileList).superRefine((f, ctx) => {
      if (!ACCEPTED_MIME_TYPES.includes(f[0].type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
            ", "
          )}] but was ${f[0].type}`,
        });
      }
      if (f[0].size > 3 * MB_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "array",
          message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${
            f[0].size
          }`,
          maximum: 3 * MB_BYTES,
          inclusive: true,
        });
      }
    }),
  });
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
  });
  const [edit, setEdit] = useState(false);
  const {
    data: profile,
    isLoading: getLoading,
    error: getError,
  } = useProfile();
  const { mutate: update, isLoading: updateLoading } = useProfileUpdate();
  const queryClient = useQueryClient();

  if (getLoading || updateLoading) return <Spinner />;

  if (getError || !profile) throw getError;

  const onSubmit = (profileData: Profile) => {
    setEdit(false);
    // const form_data = new FormData();
    // if (profileData.bio) form_data.append("bio", profileData.bio);
    // form_data.append("birthdate", profileData.birthdate);
    // form_data.append(
    //   "profile_picture",
    //   profileData?.profile_picture[0],
    //   profileData?.profile_picture[0].name
    // );
    // form_data.append(
    //   "phone",
    //   `${profileData.phone_area_code} ${profileData.phone_number}`
    // );
    // form_data.append("voice", profileData.voice_type);
    // form_data.append("role", profileData.role);

    update(profileData, {
      onSuccess: (response) => {
        queryClient.setQueryData(["profile"], response.data);
        reset(response.data, { keepErrors: false, keepDefaultValues: false });
        toast({
          title: t("common:label.success"),
          description: t("member.update_success"),
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        reset(profile, { keepErrors: false });
        toast({
          title: t("common:label.error"),
          description: t("member.update_failed"),
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <VStack
      spacing={5}
      w={"100%"}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction={{ base: "column", md: "row" }} w={"100%"} spacing={5}>
        <FormControl
          isInvalid={errors.first_name !== undefined}
          isDisabled={!edit}
        >
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            {t("member.first_name")}
          </FormLabel>
          <Input
            {...register("first_name", { value: profile.first_name })}
            {...inputStyles}
            id="first-name"
            placeholder="First name"
            autoComplete="given-name"
            tabIndex={1}
          />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors.last_name !== undefined}
          isDisabled={!edit}
        >
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            {t("member.last_name")}
          </FormLabel>
          <Input
            {...register("last_name", { value: profile.last_name })}
            {...inputStyles}
            id="last-name"
            placeholder="Last name"
            autoComplete="family-name"
            tabIndex={2}
          />
          <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl
          isInvalid={errors.birthdate !== undefined}
          isDisabled={!edit}
        >
          <FormLabel htmlFor="birthdate" fontWeight={"normal"}>
            {t("member.birthdate")}
          </FormLabel>
          <Input
            {...register("birthdate", { value: profile.birthdate })}
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

        <FormControl
          isInvalid={errors.phone_number !== undefined}
          isDisabled={!edit}
        >
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            {t("member.phone")}
          </FormLabel>
          <InputGroup>
            <InputLeftAddon p={0}>
              <Select
                {...register("phone_area_code", {
                  value: profile.phone_area_code,
                })}
                {...selectStyles}
                id="country-code"
                autoComplete="on"
                tabIndex={4}
              >
                {CountryPhoneCodeList.map((code) => (
                  <option key={code.code} value={code.dial_code}>
                    {code.dial_code}
                  </option>
                ))}
              </Select>
            </InputLeftAddon>
            <Input
              {...register("phone_number")}
              {...inputStyles}
              type="tel"
              id="phone"
              pattern="[0-9]{8,10}"
              placeholder="3333333333"
              autoComplete="tel"
              tabIndex={5}
              defaultValue={profile.phone_number}
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isDisabled={!edit}>
          <FormLabel htmlFor="voice" fontWeight={"normal"}>
            {t("member.voice")}
          </FormLabel>
          <Select
            id="voice"
            autoComplete="on"
            {...register("voice_type")}
            {...selectStyles}
            tabIndex={6}
            defaultValue={profile.voice_type}
          >
            {MemberVoiceTypeList.map((voice) => (
              <option key={voice.key} value={voice.key}>
                {voice.value}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={!edit}>
          <FormLabel htmlFor="role" fontWeight={"normal"}>
            {t("member.role")}
          </FormLabel>
          <Select
            id="role"
            autoComplete="on"
            tabIndex={7}
            {...register("role")}
            {...selectStyles}
            defaultValue={profile.role}
          >
            {MemberRoleList.map((role) => (
              <option key={role.key} value={role.key}>
                {role.value}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <FormControl
        isInvalid={errors.profile_picture !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="image" fontWeight={"normal"}>
          {t("member.picture")}
        </FormLabel>
        <Input
          {...register("profile_picture")}
          {...inputStyles}
          id="image"
          type="file"
          accept="image/*"
          placeholder="Image"
          autoComplete="off"
          tabIndex={9}
        />
        <FormErrorMessage>{errors.profile_picture?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.bio !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="bio" fontWeight={"normal"}>
          {t("member.bio")}
        </FormLabel>
        <Textarea
          {...register("bio")}
          {...inputStyles}
          id="bio"
          placeholder="Bio"
          autoComplete="off"
          tabIndex={9}
          defaultValue={profile.bio}
        />
        <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
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
              reset(profile, { keepErrors: false });
              setEdit(false);
            }}
          >
            {t("common:button.cancel")}
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default ProfileForm;
