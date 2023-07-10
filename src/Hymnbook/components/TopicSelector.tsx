import { Spinner, Text } from "@chakra-ui/react";
import useTopics, { Topic } from "../hooks/useTopics";
import NavItem from "../../components/NavItem";
import NavItemGroup from "../../components/NavItemGroup";

interface Props {
  onSelectTopic: (topic: Topic) => void;
  selectedTopic: Topic | null;
}

const TopicSelector = ({ selectedTopic, onSelectTopic }: Props) => {
  const { data, error, isLoading } = useTopics();

  {
    error && <Text>{error}</Text>;
  }
  if (isLoading) return <Spinner />;

  return (
    <NavItemGroup
      label={"Tema" + (selectedTopic ? ": " + selectedTopic.title : "s")}
    >
      {data.map((topic) => (
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
