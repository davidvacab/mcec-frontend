import {
  Box,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import HymnGrid from "../Hymnbook/components/HymnGrid";
import HymnHeading from "../Hymnbook/components/HymnHeading";
import SearchInput from "../Hymnbook/components/SearchInput";
import SortSelector from "../Hymnbook/components/SortSelector";
import TopicSelector from "../Hymnbook/components/TopicSelector";
import useHymnQueryStore from "../Hymnbook/store";
import NavItem from "../components/NavItem";
import Sidebar from "../components/Sidebar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useMainStore from "../store";
import { layoutBgColor } from "../theme";

const HymnListPage = () => {
  useDocumentTitle("Repertorio | MCEC");
  const setSearchText = useHymnQueryStore((s) => s.setSearchText);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);
  const isDrawerOpen = useMainStore((s) => s.mainElements.isDrawerOpen);
  const filters = (
    <>
      <SearchInput />
      <NavItem
        selected={false}
        onClick={() => {
          setSearchText("");
          closeDrawer();
        }}
      >
        Todos los Cantos
      </NavItem>
      <SortSelector />
      <TopicSelector />
    </>
  );

  return (
    <Box minH={"calc(100vh - 20)"} bg={layoutBgColor()}>
      <Sidebar label={"Filtros"} display={{ base: "none", md: "block" }}>
        {filters}
      </Sidebar>
      <Drawer
        autoFocus={false}
        isOpen={isDrawerOpen}
        placement="left"
        onClose={closeDrawer}
        returnFocusOnClose={true}
        onOverlayClick={closeDrawer}
        size="full"
      >
        <DrawerContent>
          <Sidebar label={"Filtros"}>{filters}</Sidebar>
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
