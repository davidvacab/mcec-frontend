import { useState } from "react";
import { Topic } from "../hooks/useTopics";
import { Flex, HStack, Show, Box } from "@chakra-ui/react";
import TopicList from "./TopicList";
import TopicSelector from "./TopicSelector";
import SortSelector from "./SortSelector";
import HymnGrid from "./HymnGrid";
import SearchInput from "./SearchInput";

export interface HymnQuery {
  topic: Topic | null;
  sortOrder: string;
  searchText: string;
}

const Hymnbook = () => {
  const [hymnQuery, setHymnQuery] = useState<HymnQuery>({} as HymnQuery);

  return (
    <Flex marginBottom={"5"} as={"main"}>
      <Show above="lg">
        <TopicList
          selectedTopic={hymnQuery.topic}
          onSelectTopic={(topic) => setHymnQuery({ ...hymnQuery, topic })}
        />
      </Show>
      <Box paddingX={5} flex={1} overflowWrap={"normal"}>
        <SearchInput
          onSearch={(searchText) => setHymnQuery({ ...hymnQuery, searchText })}
        />
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
      </Box>
    </Flex>
  );
};

export default Hymnbook;
