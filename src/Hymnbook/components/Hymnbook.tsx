import { useState } from "react";
import { Topic } from "../hooks/useTopics";
import { GridItem, HStack, Show } from "@chakra-ui/react";
import TopicList from "./TopicList";
import TopicSelector from "./TopicSelector";
import SortSelector from "./SortSelector";
import HymnGrid from "./HymnGrid";

export interface HymnQuery {
  topic: Topic | null;
  sortOrder: string;
}

const Hymnbook = () => {
  const [hymnQuery, setHymnQuery] = useState<HymnQuery>({} as HymnQuery);

  return (
    <>
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          <TopicList
            selectedTopic={hymnQuery.topic}
            onSelectTopic={(topic) => setHymnQuery({ ...hymnQuery, topic })}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"} paddingX={3}>
        <HStack spacing={5} marginY={5}>
          <Show below="lg">
            <TopicSelector
              selectedTopic={hymnQuery.topic}
              onSelectTopic={(topic: Topic) =>
                setHymnQuery({ ...hymnQuery, topic })
              }
            />
          </Show>
          <SortSelector
            sortOrder={hymnQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setHymnQuery({ ...hymnQuery, sortOrder })
            }
          />
        </HStack>
        <HymnGrid hymnQuery={hymnQuery} />
      </GridItem>
    </>
  );
};

export default Hymnbook;
