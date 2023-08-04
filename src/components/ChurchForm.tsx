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
import useDocumentTitle from "../hooks/useDocumentTitle";
import { inputStyles, selectStyles } from "../theme/theme";
import useChurch, { useChurchUpdate } from "../hooks/useChurch";
import { useQueryClient } from "@tanstack/react-query";
import Church from "../entities/Church";
import { z } from "zod";

export const churchSchema = z.object({
  minister_name: z.string().nonempty("Requerido"),
  church_name: z.string().nonempty("Requerido"),
  city: z.string().nonempty("Requerido"),
  state: z.string().nonempty("Requerido"),
  country: z.enum([CountryNames[0], ...CountryNames.slice(0)]),
});

const ChurchForm = () => {
  useDocumentTitle("Registracion | MCEC");
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

  if (getLoading || updateLoading) return <Spinner />;

  if (getError || !church) throw getError;

  const onSubmit = (churchData: Church) => {
    setEdit(false);
    update(churchData, {
      onSuccess: (response) => {
        queryClient.setQueryData(["church"], response.data);
        reset(response.data, { keepErrors: false, keepDefaultValues: false });
        toast({
          title: "Success",
          description: "Update Successful",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        reset(church, { keepErrors: false });
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

  return (
    <VStack
      spacing={5}
      w={"100%"}
      as={"form"}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FormControl
        isInvalid={errors.minister_name !== undefined}
        isDisabled={!edit}
      >
        <FormLabel htmlFor="minister">Ministro</FormLabel>
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
        <FormLabel htmlFor="church-name">Nombre de Iglesia</FormLabel>
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
        <FormLabel htmlFor="city">Ciudad</FormLabel>
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
        <FormLabel htmlFor="state">State / Province</FormLabel>
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
        <FormLabel htmlFor="country">Country / Region</FormLabel>
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
              setEdit(false);
              reset(church, { keepErrors: false });
            }}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default ChurchForm;
