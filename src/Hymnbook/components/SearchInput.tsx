import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useHymnQueryStore from "../store";
import useMainStore from "../../store";
import { inputStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";

const SearchInput = () => {
  const { t } = useTranslation("hymnbook");
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
          borderRadius={5}
          placeholder={t("search")}
          id="search-hymns"
          {...inputStyles}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
