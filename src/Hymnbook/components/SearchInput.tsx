import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useHymnQueryStore from "../../store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useHymnQueryStore((s) => s.setSearchText);

  return (
    <form
      id="hymnSearch"
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          ref.current.value = "";
        }
      }}
    >
      <InputGroup marginY={5}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Buscar Cantos"
          variant={"filled"}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
