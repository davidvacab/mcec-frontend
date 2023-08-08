import NavItem from "../../components/NavItem";
import NavCollapseGroup from "../../components/NavCollapseGroup";
import useHymnQueryStore from "../store";
import useMainStore from "../../store";
import TopicCodes from "../entities/Topics";
import { useTranslation } from "react-i18next";

const TopicSelector = () => {
  const { t } = useTranslation("hymnbook");
  const selectedTopicCode = useHymnQueryStore((s) => s.hymnQuery.topicCode);
  const setSelectedTopicCode = useHymnQueryStore((s) => s.setTopicCode);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);

  return (
    <NavCollapseGroup
      label={`${t("topic", {
        count: 2,
      })}: ${selectedTopicCode ? t(`topic.${selectedTopicCode}`) : ""}`}
    >
      {TopicCodes.map((code) => (
        <NavItem
          key={code}
          onClick={() => {
            setSelectedTopicCode(code);
            closeDrawer();
          }}
          selected={selectedTopicCode === code}
        >
          {t(`topic.${code}`)}
        </NavItem>
      ))}
    </NavCollapseGroup>
  );
};

export default TopicSelector;
