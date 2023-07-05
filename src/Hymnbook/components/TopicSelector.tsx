import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useTopics, { Topic } from "../hooks/useTopics";

interface Props {
    onSelectTopic: (topic: Topic) => void;
    selectedTopic: Topic | null;
}

const topicSelector = ({onSelectTopic, selectedTopic}: Props) => {
  const { data, error } = useTopics();

  if (error) return null;  

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Tema: {selectedTopic?.title}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectTopic({id: 0, title: ""})}>Todos los cantos</MenuItem>
        {data.map((topic) => (
          <MenuItem
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
          >
            {topic.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default topicSelector;
