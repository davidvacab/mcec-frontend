import { Button, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useTopics, { Topic } from "../hooks/useTopics";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  onSelectTopic: (topic: Topic) => void;
  selectedTopic: Topic | null;
}

const TopicList = ({ selectedTopic, onSelectTopic }: Props) => {
  const { data, error, isLoading } = useTopics();

  {
    error && <Text>{error}</Text>;
  }
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data.map((topic) => (
        <ListItem
          key={topic.id}
          padding={1}
          fontSize={"lg"}
          
          
        >
          <Button
            variant={topic.id === selectedTopic?.id ? "outline" : "link"}
            colorScheme={topic.id === selectedTopic?.id ? "teal" : ""}
            fontWeight={topic.id === selectedTopic?.id ? "bold" : "normal"}
            width={"100%"}
            onClick={() => onSelectTopic(topic)}
          >
            {topic.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;
