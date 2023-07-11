import { Spinner, Text } from "@chakra-ui/react";
import useTopics, { Topic } from "../hooks/useTopics";
import NavItem from "../../components/NavItem";
import NavItemGroup from "../../components/NavItemGroup";

interface Props {
  onSelectTopic: (topic: Topic) => void;
  selectedTopicId: number;
}

const TopicSelector = ({ selectedTopicId, onSelectTopic }: Props) => {
  const { data, error, isLoading } = useTopics();
  const selectedTopic = data?.results.find((t) => t.id === selectedTopicId);

  {
    error && <Text>{error.message}</Text>;
  }
  if (isLoading) return <Spinner />;

  return (
    <NavItemGroup
      label={"Tema" + (selectedTopic ? ": " + selectedTopic.title : "s")}
    >
      {data?.results.map((topic) => (
        <NavItem
          key={topic.id}
          onClick={() => onSelectTopic(topic)}
          selected={selectedTopic?.id === topic.id}
        >
          {topic.title}
        </NavItem>
      ))}
    </NavItemGroup>
  );
};

export default TopicSelector;
