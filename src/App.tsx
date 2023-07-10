import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import SidebarContent from "./components/SidebarContent";
import HymnGrid from "./Hymnbook/components/HymnGrid";
import { Topic } from "./Hymnbook/hooks/useTopics";
import TopicSelector from "./Hymnbook/components/TopicSelector";
import SortSelector from "./Hymnbook/components/SortSelector";
import SearchInput from "./Hymnbook/components/SearchInput";
import NavItem from "./components/NavItem";
import HymnHeading from "./Hymnbook/components/HymnHeading";

export interface HymnQuery {
  topic: Topic | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [hymnQuery, setHymnQuery] = useState<HymnQuery>({} as HymnQuery);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filters = (
    <>
      <NavItem
        selected={false}
        borderWidth={"1px"}
        borderColor={"cyan.300"}
        onClick={() => {
          setHymnQuery({} as HymnQuery);
          onClose();
        }}
      >
        Todos los Cantos
      </NavItem>
      <SearchInput
        onSearch={(searchText) => {
          setHymnQuery({ ...hymnQuery, searchText });
          onClose();
        }}
      />
      <SortSelector
        sortOrder={hymnQuery.sortOrder}
        onSelectSortOrder={(sortOrder) => {
          setHymnQuery({ ...hymnQuery, sortOrder });
          onClose();
        }}
      />
      <TopicSelector
        selectedTopic={hymnQuery.topic}
        onSelectTopic={(topic) => {
          setHymnQuery({ ...hymnQuery, topic });
          onClose();
        }}
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
        <HymnHeading hymnQuery={hymnQuery} />
        <HymnGrid hymnQuery={hymnQuery} />
      </Box>
    </Box>
  );
}

export default App;
