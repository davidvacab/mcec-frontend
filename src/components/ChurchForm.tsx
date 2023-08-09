import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CountryNames, { CountryNameList } from "../entities/CountryNames";
import { inputStyles, selectStyles } from "../theme/theme";
import useChurch, { useChurchUpdate } from "../hooks/useChurch";
import { useQueryClient } from "@tanstack/react-query";
import Church from "../entities/Church";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChurchForm = () => {
  const { t } = useTranslation("members");
  const churchSchema = z.object({
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
  });
  const toast = useToast();
  const [edit, setEdit] = useState(false);
  const { data: church, isLoading: getLoading, error: getError } = useChurch();
  const { mutate: update, isLoading: updateLoading } = useChurchUpdate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Church>({
    resolver: zodResolver(churchSchema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (getLoading || updateLoading) return <Spinner />;

  if (getError || !church) {
    toast({
      title: t("label.error"),
      description: t("label.error"),
      status: "error",
      position: "top",
      duration: 9000,
      isClosable: true,
    });
    navigate("/", { replace: true });
    return;
  }

  const onSubmit = (churchData: Church) => {
    setEdit(false);
    update(churchData, {
      onSuccess: (response) => {
        queryClient.setQueryData(["church"], response.data);
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
        reset(church, { keepErrors: false });
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
      <FormControl
        isInvalid={errors.minister_name !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="minister">{t("member.minister_name")}</FormLabel>
        <Input
          type="text"
          id="minister"
          autoComplete="name"
          {...register("minister_name", {
            value: church.minister_name,
          })}
          {...inputStyles}
          tabIndex={1}
        />
        <FormErrorMessage>{errors.minister_name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.church_name !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="church-name">{t("member.church_name")}</FormLabel>
        <Input
          type="text"
          id="church-name"
          autoComplete="organization"
          {...register("church_name", { value: church.church_name })}
          {...inputStyles}
          tabIndex={2}
        />
        <FormErrorMessage>{errors.church_name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.city !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="city">{t("member.city")}</FormLabel>
        <Input
          type="text"
          id="city"
          autoComplete="address-level2"
          {...register("city", { value: church.city })}
          {...inputStyles}
          tabIndex={3}
        />
        <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.state !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="state">{t("member.state")}</FormLabel>
        <Input
          type="text"
          id="state"
          autoComplete="address-level1"
          {...register("state", { value: church.state })}
          {...inputStyles}
          tabIndex={4}
        />
        <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isDisabled={!edit}>
        <FormLabel htmlFor="country">{t("member.country")}</FormLabel>
        <Select
          id="country"
          autoComplete="country"
          {...register("country", { value: church.country })}
          {...selectStyles}
          tabIndex={5}
        >
          {CountryNameList.map((country) => (
            <option key={country.alpha3} value={country.alpha2}>
              {country.name}
            </option>
          ))}
        </Select>
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
              setEdit(false);
              reset(church, { keepErrors: false });
            }}
          >
            {t("common:button.cancel")}
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default ChurchForm;
