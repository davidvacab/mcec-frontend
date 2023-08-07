import NavItem from "../../components/NavItem";
import NavCollapseGroup from "../../components/NavCollapseGroup";
import useTopic from "../hooks/useTopic";
import useHymnQueryStore from "../store";
import useMainStore from "../../store";
import { TopicList } from "../entities/Topics";
import { useTranslation } from "react-i18next";

const TopicSelector = () => {
  const { t } = useTranslation("hymnbook");
  const selectedTopicId = useHymnQueryStore((s) => s.hymnQuery.topicCode);
  const setSelectedTopicId = useHymnQueryStore((s) => s.setTopicCode);
  const selectedTopic = useTopic(selectedTopicId);
  const closeDrawer = useMainStore((s) => s.closeSideDrawer);

  return (
    <NavCollapseGroup
      label={`${t("topic", {
        count: 2,
      })}: ${selectedTopic}`}
    >
      {TopicList.map((topic) => (
        <NavItem
          key={topic.code}
          onClick={() => {
            setSelectedTopicId(topic.code);
            closeDrawer();
          }}
          selected={selectedTopic?.code === topic.code}
        >
          {topic.title}
        </NavItem>
      ))}
    </NavCollapseGroup>
  );
};

export default TopicSelector;
