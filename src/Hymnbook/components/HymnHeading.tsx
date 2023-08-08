import { Heading } from "@chakra-ui/react";
import useHymnQueryStore from "../store";
import { useTranslation } from "react-i18next";

const HymnHeading = () => {
  const { t } = useTranslation("hymnbook");
  const selectedTopicCode = useHymnQueryStore((s) => s.hymnQuery.topicCode);
  const searchText = useHymnQueryStore((s) => s.hymnQuery.searchText);
  const heading = `${searchText || selectedTopicCode ? t("hymns") : ""} ${
    selectedTopicCode ? `${t("of")} ${t(`topic.${selectedTopicCode}`)}` : ""
  } ${searchText ? `${t("with_title")} '${searchText}'` : ""}`;
  return (
    <Heading
      as={"h1"}
      my={heading && "6"}
      size={{
        sm: "md",
        lg: "lg",
      }}
      textAlign={"center"}
    >
      {heading}
    </Heading>
  );
};

export default HymnHeading;
