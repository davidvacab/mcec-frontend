import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import HymnGrid from "./Hymnbook/components/HymnGrid";

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
        <GridItem area={"aside"} bg={"gold"}>
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg={"blue.700"}>
        <HymnGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
