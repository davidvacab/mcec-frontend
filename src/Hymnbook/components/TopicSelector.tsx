import { Spinner, Text } from "@chakra-ui/react";
import SidebarItem from "../../components/SidebarItem";
import SidebarItemGroup from "../../components/SidebarItemGroup";
import useTopic from "../hooks/useTopic";
import useHymnQueryStore from "../store";
import useTopics from "../hooks/useTopics";

const TopicSelector = () => {
  const { data, error, isLoading } = useTopics();
  const selectedTopicId = useHymnQueryStore((s) => s.hymnQuery.topicId);
  const setSelectedTopicId = useHymnQueryStore((s) => s.setTopicId);
  const selectedTopic = useTopic(selectedTopicId);

  {
    error && <Text>{error.message}</Text>;
  }
  if (isLoading) return <Spinner />;

  return (
    <SidebarItemGroup
      label={"Tema" + (selectedTopic ? ": " + selectedTopic.title : "s")}
    >
      {data?.results.map((topic) => (
        <SidebarItem
          key={topic.id}
          onClick={() => setSelectedTopicId(topic.id)}
          selected={selectedTopic?.id === topic.id}
        >
          {topic.title}
        </SidebarItem>
      ))}
    </SidebarItemGroup>
  );
};

export default TopicSelector;
