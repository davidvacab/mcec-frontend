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
import { z } from "zod";
import countriesES from "../entities/countries.es";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { inputStyles, selectStyles } from "../theme/theme";
import useChurch, { useChurchUpdate } from "../hooks/useChurch";

const churchSchema = z.object({
  minister: z.string().nonempty("Requerido"),
  church: z.string().nonempty("Requerido"),
  city: z.string().nonempty("Requerido"),
  state: z.string().nonempty("Requerido"),
  country: z.enum([
    countriesES[0].alpha2,
    ...countriesES.slice(0).map((country) => country.alpha2),
  ]),
});

type ChurchData = z.infer<typeof churchSchema>;

const ChurchForm = () => {
  useDocumentTitle("Registracion | MCEC");
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChurchData>({
    resolver: zodResolver(churchSchema),
  });
  const [edit, setEdit] = useState(false);
  const {
    data: church,
    isLoading: getLoading,
    error: getError,
    refetch,
  } = useChurch();
  const {
    mutate: update,
    isLoading: updateLoading,
    error: updateError,
  } = useChurchUpdate();

  if (getLoading || updateLoading) return <Spinner />;

  if (getError || !church) throw getError;
  if (updateError) throw updateError;

  const onSubmit = (data: ChurchData) => {
    update(
      {
        ...data,
        current_minister_name: data.minister,
        church_name: data.church,
      },
      {
        onSuccess: () => {
          setEdit(false);
          refetch();
          toast({
            title: "Success",
            description: "Update Successful",
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
      <FormControl isInvalid={errors.minister !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="minister">Ministro</FormLabel>
        <Input
          type="text"
          id="minister"
          autoComplete="name"
          {...register("minister")}
          {...inputStyles}
          tabIndex={1}
          value={church.current_minister_name}
        />
        <FormErrorMessage>{errors.minister?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.church !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="church-name">Nombre de Iglesia</FormLabel>
        <Input
          type="text"
          id="church-name"
          autoComplete="organization"
          {...register("church")}
          {...inputStyles}
          tabIndex={2}
          value={church.church_name}
        />
        <FormErrorMessage>{errors.church?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.city !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="city">Ciudad</FormLabel>
        <Input
          type="text"
          id="city"
          autoComplete="address-level2"
          {...register("city")}
          {...inputStyles}
          tabIndex={3}
          value={church.city}
        />
        <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.state !== undefined} isDisabled={!edit}>
        <FormLabel htmlFor="state">State / Province</FormLabel>
        <Input
          type="text"
          id="state"
          autoComplete="address-level1"
          {...register("state")}
          {...inputStyles}
          tabIndex={4}
          value={church.state}
        />
        <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isDisabled={!edit}>
        <FormLabel htmlFor="country">Country / Region</FormLabel>
        <Select
          id="country"
          autoComplete="country"
          {...register("country")}
          {...selectStyles}
          tabIndex={5}
          value={church.country?.toLowerCase()}
        >
          {countriesES.map((country) => (
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
            onClick={() => setEdit(false)}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      )}
    </VStack>
  );
};

export default ChurchForm;
