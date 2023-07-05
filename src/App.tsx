import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import HymnGrid from "./Hymnbook/components/HymnGrid";
import TopicList from "./Hymnbook/components/TopicList";
import { useState } from "react";
import { Topic } from "./Hymnbook/hooks/useTopics";
import SortSelector from "./Hymnbook/components/SortSelector";
import TopicSelector from "./Hymnbook/components/topicSelector";

export interface HymnQuery {
  topic: Topic | null;
  sortOrder: string;
}

function App() {
  const [hymnQuery, setHymnQuery] = useState<HymnQuery>({} as HymnQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
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
          <TopicList
            selectedTopic={hymnQuery.topic}
            onSelectTopic={(topic) => setHymnQuery({ ...hymnQuery, topic })}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <HStack spacing={5} paddingLeft={2} marginBottom={5}>
        <TopicSelector
            selectedTopic={hymnQuery.topic}
            onSelectTopic={(topic: Topic) =>
              setHymnQuery({ ...hymnQuery, topic })
            }
          />
          <SortSelector
            sortOrder={hymnQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setHymnQuery({ ...hymnQuery, sortOrder })
            }
          />
        </HStack>
        <HymnGrid hymnQuery={hymnQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
