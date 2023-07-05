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

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: "release_date", label: "Reciente" },
    { value: "-release_date", label: "Antiguo" },
    { value: "title", label: "Titulo A-Z" },
    { value: "-title", label: "Titulo Z-A" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        h={12}
        w={"fit-content"}
      >
        <Text>
          Orden:
          <br />
          {currentSortOrder?.label || "Reciente"}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          defaultValue={"release_date"}
          title="Orden"
          type="radio"
        >
          {sortOrders.map((order) => (
            <MenuItemOption
              key={order.value}
              value={order.value}
              onClick={() => onSelectSortOrder(order.value)}
            >
              {order.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
