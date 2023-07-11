import { Heading } from "@chakra-ui/react";
import { HymnQuery } from "../../App";
import useTopic from "../hooks/useTopic";

interface Props {
  hymnQuery: HymnQuery;
}

const HymnHeading = ({ hymnQuery }: Props) => {
  const topic = useTopic(hymnQuery.topicId);
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
