import {
  Box,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import useHymnQueryStore from "../Hymnbook/store";
import SearchInput from "../Hymnbook/components/SearchInput";
import NavItem from "../components/NavItem";
import SortSelector from "../Hymnbook/components/SortSelector";
import TopicSelector from "../Hymnbook/components/TopicSelector";
import Sidebar from "../components/Sidebar";
import HymnHeading from "../Hymnbook/components/HymnHeading";
import HymnGrid from "../Hymnbook/components/HymnGrid";
import useDocumentTitle from "../hooks/useDocumentTitle";

const HymnListPage = () => {
  useDocumentTitle("Repertorio");
  const { isOpen, onClose } = useDisclosure();
  const setSearchText = useHymnQueryStore((s) => s.setSearchText);
  const filters = (
    <>
      <SearchInput
      // onSearch={() => {
      //   onClose();
      // }}
      />
      <NavItem
        selected={false}
        onClick={() => {
          setSearchText("");
          onClose();
        }}
      >
        Todos los Cantos
      </NavItem>
      <SortSelector
      // onSelectSortOrder={() => {
      //   onClose();
      // }}
      />
      <TopicSelector
      // onSelectTopic={(topic) => {
      //   onClose();
      // }}
      />
    </>
  );

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar
        label={"Filtros"}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      >
        {filters}
      </Sidebar>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={true}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar label={"Filtros"} onClose={onClose}>
            {filters}
          </Sidebar>
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 72 }}>
        <HymnHeading />
        <HymnGrid />
      </Box>
    </Box>
  );
};

export default HymnListPage;
