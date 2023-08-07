import { useTranslation } from "react-i18next";
import NavCollapseGroup from "../../components/NavCollapseGroup";
import NavItem from "../../components/NavItem";
import useMainStore from "../../store";
import useHymnQueryStore from "../store";

const SortSelector = () => {
  const { t } = useTranslation("hymnbook");
  const sortOrder = useHymnQueryStore((s) => s.hymnQuery.sortOrder);
  const setSortOrder = useHymnQueryStore((s) => s.setSortOrder);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);

  const sortOrders = [
    { value: "", label: t("order.recent") },
    { value: "release_date", label: t("order.release_date_new") },
    { value: "-release_date", label: t("order.release_date_old") },
    { value: "title", label: t("order.title_new") },
    { value: "-title", label: t("order.title_old") },
  ];

  const label = sortOrders.find((order) => sortOrder === order.value)?.label;

  return (
    <NavCollapseGroup
      label={`${t("order.order")} \n ${sortOrder ? label : t("order.recent")}`}
    >
      {sortOrders.map((order) => (
        <NavItem
          selected={order.value === sortOrder}
          key={order.value}
          onClick={() => {
            setSortOrder(order.value);
            closeDrawer();
          }}
        >
          {order.label}
        </NavItem>
      ))}
    </NavCollapseGroup>
  );
};

export default SortSelector;
