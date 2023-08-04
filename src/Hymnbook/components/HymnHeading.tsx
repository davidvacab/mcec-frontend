import { Heading } from "@chakra-ui/react";
import useTopic from "../hooks/useTopic";
import useHymnQueryStore from "../store";

const HymnHeading = () => {
  const selectedTopicCode = useHymnQueryStore((s) => s.hymnQuery.topicCode);
  const topic = useTopic(selectedTopicCode);
  const searchText = useHymnQueryStore((s) => s.hymnQuery.searchText);
  const heading = `${searchText || selectedTopicCode ? "Cantos " : ""} ${
    selectedTopicCode ? "de " + topic?.title : ""
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
