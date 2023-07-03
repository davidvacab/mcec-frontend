import { List, ListItem } from "@chakra-ui/react";
import useTopics from "../hooks/useTopics";

const TopicList = () => {
  const { data, error, isLoading } = useTopics();

  return (
    <List>
      {data.map((topic) => (
        <ListItem key={topic.id} paddingY={1} fontSize={'lg'}>{topic.title}</ListItem>
      ))}
    </List>
  );
};

export default TopicList;
