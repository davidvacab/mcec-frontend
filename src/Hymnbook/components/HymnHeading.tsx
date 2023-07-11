import { Heading } from "@chakra-ui/react";
import { HymnQuery } from "../../App";
import useTopics from "../hooks/useTopics";

interface Props {
  hymnQuery: HymnQuery;
}

const HymnHeading = ({ hymnQuery }: Props) => {
  const { data: topics } = useTopics();
  const topic = topics?.results.find((t) => t.id === hymnQuery.topicId);
  const heading = `${
    hymnQuery.topicId || hymnQuery.searchText ? "Cantos " : ""
  } ${hymnQuery.topicId ? "de " + topic?.title : ""} ${
    hymnQuery.searchText ? "con el titulo '" + hymnQuery.searchText + "'" : ""
  }`;
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
