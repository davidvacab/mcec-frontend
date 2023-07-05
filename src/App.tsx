import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Hymnbook from "./Hymnbook/components/Hymnbook";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        md: `"nav" "bar" "main" "footer"`,
        lg: `"nav nav" "aside main" "footer footer"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Hymnbook />
    </Grid>
  );
}

export default App;
