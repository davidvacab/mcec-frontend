import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
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
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        h={12}
        w={"-moz-fit-content"}
      >
        <Text>
          Tema:
          <br />
          {selectedTopic?.title || "Todos"}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={"Todos"} title="Temas" type="radio">
          <MenuItemOption
            value="Todos"
            onClick={() => onSelectTopic({ id: "", title: "Todos" })}
          >
            Todos los cantos
          </MenuItemOption>
          {data.map((topic) => (
            <MenuItemOption
              key={topic.id}
              value={topic.title}
              onClick={() => onSelectTopic(topic)}
            >
              {topic.title}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default topicSelector;
