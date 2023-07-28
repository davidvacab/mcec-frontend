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
import memberRoles from "../entities/memberRoles";
import memberVoices from "../entities/memberVoices";
import phoneCountryCodes from "../entities/phoneCountryCodes";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { inputStyles, selectStyles } from "../theme/theme";
import { useState } from "react";
import useProfile, { useProfileUpdate } from "../hooks/useProfile";

const MB_BYTES = 1000000;

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];

const schema = z.object({
  firstName: z.string().nonempty("Requerido").max(50),
  lastName: z.string().nonempty("Requerido").max(50),
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
  bio: z.string().max(250),
  image: z.instanceof(FileList).superRefine((f, ctx) => {
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

type FormData = z.infer<typeof schema>;

const ProfileForm = () => {
  useDocumentTitle("Registracion | MCEC");
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [edit, setEdit] = useState(false);
  const {
    data: profile,
    isLoading: getLoading,
    error: getError,
    refetch,
  } = useProfile();
  const {
    mutate: update,
    isLoading: updateLoading,
    error: updateError,
  } = useProfileUpdate();

  if (getLoading || updateLoading) return <Spinner />;

  if (getError || !profile) throw getError;
  if (updateError) throw updateError;

  const onSubmit = (data: FormData) => {
    update(
      {
        bio: data.bio,
        picture: data.image[0],
        birth_date: data.birthdate,
        phone: `${data.areaCode} ${data.phone}`,
        voice: data.voice,
        role: data.role,
      },
      {
        onSuccess: () => {
          setEdit(false);
          refetch();
          toast({
            title: "Suceess",
            description: "Profile Updated",
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <VStack
      spacing={5}
      w={"100%"}
      as={"form"}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Stack direction={{ base: "column", md: "row" }} w={"100%"} spacing={5}>
        <FormControl
          isInvalid={errors.firstName !== undefined}
          isDisabled={!edit}
        >
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

        <FormControl
          isInvalid={errors.lastName !== undefined}
          isDisabled={!edit}
        >
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
        <FormControl
          isInvalid={errors.birthdate !== undefined}
          isDisabled={!edit}
        >
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
            value={profile.birth_date}
          />
          <FormErrorMessage>{errors.birthdate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone !== undefined} isDisabled={!edit}>
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
                value={profile.phone?.split(" ")[0]}
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
              value={profile.phone?.split(" ")[1]}
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} w={"100%"}>
        <FormControl isDisabled={!edit}>
          <FormLabel htmlFor="voice" fontWeight={"normal"}>
            Voice
          </FormLabel>
          <Select
            id="voice"
            autoComplete="on"
            {...register("voice")}
            {...selectStyles}
            tabIndex={6}
            value={profile.voice}
          >
            {memberVoices.map((voice) => (
              <option key={voice.key} value={voice.key}>
                {voice.value}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={!edit}>
          <FormLabel htmlFor="role" fontWeight={"normal"}>
            Role
          </FormLabel>
          <Select
            id="role"
            autoComplete="on"
            tabIndex={7}
            {...register("role")}
            {...selectStyles}
            value={profile.role}
          >
            {memberRoles.map((role) => (
              <option key={role.key} value={role.key}>
                {role.value}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <FormControl isInvalid={errors.image !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="image" fontWeight={"normal"}>
          Picture
        </FormLabel>
        <Input
          {...register("image")}
          {...inputStyles}
          id="image"
          type="file"
          accept="image/*"
          placeholder="Image"
          autoComplete="off"
          tabIndex={9}
        />
        <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.bio !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="bio" fontWeight={"normal"}>
          Bio
        </FormLabel>
        <Textarea
          {...register("bio")}
          {...inputStyles}
          id="bio"
          placeholder="Bio"
          autoComplete="off"
          tabIndex={9}
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
            onClick={() => setEdit(false)}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default ProfileForm;
