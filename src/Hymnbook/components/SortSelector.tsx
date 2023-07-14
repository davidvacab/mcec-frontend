import NavCollapseGroup from "../../components/NavCollapseGroup";
import NavItem from "../../components/NavItem";
import useHymnQueryStore from "../store";

const SortSelector = () => {
  const sortOrder = useHymnQueryStore((s) => s.hymnQuery.sortOrder);
  const setSortOrder = useHymnQueryStore((s) => s.setSortOrder);

  const sortOrders = [
    { value: "", label: "Anadido Recientemente" },
    { value: "release_date", label: "Publicacion Reciente" },
    { value: "-release_date", label: "Publicacion Antigua" },
    { value: "title", label: "Titulo A-Z" },
    { value: "-title", label: "Titulo Z-A" },
  ];

  const label = sortOrders.find((order) => sortOrder === order.value)?.label;

  return (
    <NavCollapseGroup
      label={"Orden: \n" + (sortOrder ? label : "Anadido Recientemente")}
    >
      {sortOrders.map((order) => (
        <NavItem
          selected={order.value === sortOrder}
          key={order.value}
          onClick={() => setSortOrder(order.value)}
        >
          {order.label}
        </NavItem>
      ))}
    </NavCollapseGroup>
  );
};

export default SortSelector;
