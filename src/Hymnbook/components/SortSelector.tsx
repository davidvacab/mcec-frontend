import NavItemGroup from "../../components/NavItemGroup";
import NavItem from "../../components/NavItem";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: "", label: "Anadido Recientemente" },
    { value: "release_date", label: "Publicacion Reciente" },
    { value: "-release_date", label: "Publicacion Antigua" },
    { value: "title", label: "Titulo A-Z" },
    { value: "-title", label: "Titulo Z-A" },
  ];

  const label = sortOrders.find((order) => sortOrder === order.value)?.label;

  return (
    <NavItemGroup
      label={"Orden: \n" + (sortOrder ? label : "Anadido Recientemente")}
    >
      {sortOrders.map((order) => (
        <NavItem
          selected={order.value === sortOrder}
          key={order.value}
          onClick={() => onSelectSortOrder(order.value)}
        >
          {order.label}
        </NavItem>
      ))}
    </NavItemGroup>
  );
};

export default SortSelector;
