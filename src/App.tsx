import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavigationBar from "./components/NavigationBar";
import SidebarContent from "./components/SidebarContent";
import HymnGrid from "./Hymnbook/components/HymnGrid";
import TopicSelector from "./Hymnbook/components/TopicSelector";
import SortSelector from "./Hymnbook/components/SortSelector";
import SearchInput from "./Hymnbook/components/SearchInput";
import NavItem from "./components/NavItem";
import HymnHeading from "./Hymnbook/components/HymnHeading";
import useHymnQueryStore from "./store";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        borderWidth={"1px"}
        borderColor={"cyan.300"}
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
      <NavigationBar onOpen={onOpen} />
      <SidebarContent
        label={"Filtros"}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      >
        {filters}
      </SidebarContent>
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
          <SidebarContent label={"Filtros"} onClose={onClose}>
            {filters}
          </SidebarContent>
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 80 }} p="4">
        <HymnHeading />
        <HymnGrid />
      </Box>
    </Box>
  );
}

export default App;
