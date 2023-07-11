import { useState } from "react";
import { Topic } from "../hooks/useTopics";
import { HStack, Show, Box } from "@chakra-ui/react";
import TopicSelector from "./TopicSelector";
import SortSelector from "./SortSelector";
import HymnGrid from "./HymnGrid";
import SearchInput from "./SearchInput";

const Hymnbook = () => {
  const [hymnQuery, setHymnQuery] = useState<HymnQuery>({} as HymnQuery);

  return (
    <Box as={"main"}>
      <Show above="lg">
        <TopicSelector
          selectedTopicId={hymnQuery.topic}
          onSelectTopic={(topic) => setHymnQuery({ ...hymnQuery, topic })}
        />
      </Show>
      <Box ml={{ base: 0, md: 0 }} p="4">
        <SearchInput
          onSearch={(searchText) => setHymnQuery({ ...hymnQuery, searchText })}
        />
        <HStack spacing={{ base: "0", md: "6" }} marginY={5}>
          <Show below="lg">
            <TopicSelector
              selectedTopicId={hymnQuery.topic}
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
    </Box>
  );
};

export default Hymnbook;
