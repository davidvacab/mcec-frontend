import { Spinner, Text } from "@chakra-ui/react";
import NavItem from "../../components/NavItem";
import NavCollapseGroup from "../../components/NavCollapseGroup";
import useTopic from "../hooks/useTopic";
import useHymnQueryStore from "../store";
import useTopics from "../hooks/useTopics";
import useMainStore from "../../store";

const TopicSelector = () => {
  const { data, error, isLoading } = useTopics();
  const selectedTopicId = useHymnQueryStore((s) => s.hymnQuery.topicId);
  const setSelectedTopicId = useHymnQueryStore((s) => s.setTopicId);
  const selectedTopic = useTopic(selectedTopicId);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);

  {
    error && <Text>{error.message}</Text>;
  }
  if (isLoading) return <Spinner />;

  return (
    <NavCollapseGroup
      label={"Tema" + (selectedTopic ? ": " + selectedTopic.title : "s")}
    >
      {data?.results.map((topic) => (
        <NavItem
          key={topic.id}
          onClick={() => {
            setSelectedTopicId(topic.id);
            closeDrawer();
          }}
          selected={selectedTopic?.id === topic.id}
        >
          {topic.title}
        </NavItem>
      ))}
    </NavCollapseGroup>
  );
};

export default TopicSelector;
