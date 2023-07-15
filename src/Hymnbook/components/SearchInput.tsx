import { Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useHymnQueryStore from "../store";
import useMainStore from "../../store";
import { cardBgColor } from "../../theme";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useHymnQueryStore((s) => s.setSearchText);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);

  return (
    <form
      id="hymnSearch"
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          ref.current.value = "";
        }
        closeDrawer();
      }}
    >
      <InputGroup marginY={5}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Buscar Cantos"
          variant={"filled"}
          bgColor={cardBgColor()}
          _focus={{bg: useColorModeValue("gray.50", "gray.900")}}
          _hover={{bg: useColorModeValue("gray.300","gray.600")}}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
