import { SimpleGrid, Text } from "@chakra-ui/react";
import useHymns from "../hooks/useHymns";
import HymnCard from "./HymnCard";
import HymnCardSkeleton from "./HymnCardSkeleton";
import HymnCardContainer from "./HymnCardContainer";
import { HymnQuery } from "../../App";

interface Props {
  hymnQuery: HymnQuery;
}

const HymnGrid = ({ hymnQuery }: Props) => {
  const { data, error, isLoading } = useHymns(hymnQuery);
  const skeletons = [1, 2, 3, 4, 5];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={5}
        padding={"10px"}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <HymnCardContainer key={skeleton}>
              <HymnCardSkeleton />
            </HymnCardContainer>
          ))}
        {data.map((hymn) => (
          <HymnCardContainer key={hymn.id}>
            <HymnCard hymn={hymn} />
          </HymnCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default HymnGrid;
