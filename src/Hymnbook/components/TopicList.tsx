import { List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useTopics from "../hooks/useTopics";

const TopicList = () => {
  const { data, error, isLoading } = useTopics();

  {
    error && <Text>{error}</Text>;
  }
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data.map((topic) => (
        <ListItem key={topic.id} paddingY={1} fontSize={"lg"}>
          {topic.title}
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;
