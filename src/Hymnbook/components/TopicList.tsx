import {
  Button,
  Divider,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useTopics, { Topic } from "../hooks/useTopics";

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
  const plainTopic = { id: "", title: "Todos los cantos" };
  return (
    <>
      <Heading size={"md"} marginY={5}>
        Temas:
      </Heading>
      <Divider />
      <List marginY={3}>
        <ListItem key={plainTopic.id} padding={1} fontSize={"lg"}>
          <Button
            variant={plainTopic.id === selectedTopic?.id ? "outline" : "link"}
            colorScheme={plainTopic.id === selectedTopic?.id ? "blue" : ""}
            fontWeight={plainTopic.id === selectedTopic?.id ? "bold" : "normal"}
            width={"100%"}
            onClick={() => onSelectTopic(plainTopic)}
            justifyContent={"left"}
          >
            {plainTopic.title}
          </Button>
        </ListItem>
        {data.map((topic) => (
          <ListItem key={topic.id} padding={1} fontSize={"lg"}>
            <Button
              variant={topic.id === selectedTopic?.id ? "outline" : "link"}
              colorScheme={topic.id === selectedTopic?.id ? "blue" : ""}
              fontWeight={topic.id === selectedTopic?.id ? "bold" : "normal"}
              width={"100%"}
              onClick={() => onSelectTopic(topic)}
              justifyContent={"left"}
            >
              {topic.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TopicList;
