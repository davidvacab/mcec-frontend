import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useTopics, { Topic } from "../hooks/useTopics";

interface Props {
  onSelectTopic: (topic: Topic) => void;
  selectedTopic: Topic | null;
}

const topicSelector = ({ onSelectTopic, selectedTopic }: Props) => {
  const { data, error } = useTopics();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />} h={12} w={"-moz-fit-content"}>
        <Text>
          Tema:
          <br/>
          {selectedTopic?.title || "Todos"}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectTopic({ id: "", title: "Todos" })}>
          Todos los cantos
        </MenuItem>
        {data.map((topic) => (
          <MenuItem key={topic.id} onClick={() => onSelectTopic(topic)}>
            {topic.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default topicSelector;
