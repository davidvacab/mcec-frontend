import { Button, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useTopics, { Topic } from "../hooks/useTopics";

interface Props {
    onSelectTopic: (topic: Topic) => void;
}

const TopicList = ({onSelectTopic}: Props) => {
  const { data, error, isLoading } = useTopics();

  {
    error && <Text>{error}</Text>;
  }
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data.map((topic) => (
        <ListItem key={topic.id} paddingY={1} fontSize={"lg"}>
          <Button variant={"link"} onClick={() => onSelectTopic(topic)}>{topic.title}</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;
