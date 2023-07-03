import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import HymnGrid from "./Hymnbook/components/HymnGrid";
import TopicList from "./Hymnbook/components/TopicList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>
          <TopicList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <HymnGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
