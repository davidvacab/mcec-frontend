import { Heading } from "@chakra-ui/react";
import { HymnQuery } from "../../App";

interface Props {
  hymnQuery: HymnQuery;
}

const HymnHeading = ({ hymnQuery }: Props) => {
  const heading = `${
    hymnQuery.topic || hymnQuery.searchText ? "Cantos " : ""
  } ${hymnQuery.topic ? "de " + hymnQuery.topic.title : ""} ${
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
