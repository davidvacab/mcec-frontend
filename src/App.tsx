import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import HymnGrid from "./Hymnbook/components/HymnGrid";
import TopicList from "./Hymnbook/components/TopicList";
import { useState } from "react";
import { Topic } from "./Hymnbook/hooks/useTopics";

function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          <TopicList onSelectTopic={(topic) => setSelectedTopic(topic)} />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <HymnGrid selectedTopic={selectedTopic} />
      </GridItem>
    </Grid>
  );
}

export default App;
