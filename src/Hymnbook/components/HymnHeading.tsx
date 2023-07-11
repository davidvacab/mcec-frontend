import { Heading } from "@chakra-ui/react";
import useTopic from "../hooks/useTopic";
import useHymnQueryStore from "../../store";

const HymnHeading = () => {
  const selectedTopicId = useHymnQueryStore((s) => s.hymnQuery.topicId);
  const topic = useTopic(selectedTopicId);
  const searchText = useHymnQueryStore((s) => s.hymnQuery.searchText);
  const heading = `${searchText || selectedTopicId ? "Cantos " : ""} ${
    selectedTopicId ? "de " + topic?.title : ""
  } ${searchText ? "con el titulo '" + searchText + "'" : ""}`;
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
