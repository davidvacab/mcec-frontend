import { SimpleGrid, Text } from "@chakra-ui/react";
import useHymns from "../hooks/useHymns";
import HymnCard from "./HymnCard";
import HymnCardSkeleton from "./HymnCardSkeleton";
import HymnCardContainer from "./HymnCardContainer";

const HymnGrid = () => {
  const { data, error, isLoading } = useHymns();
  const skeletons = [1, 2, 3, 4, 5];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={10}
        padding={"10px"}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <HymnCardContainer>
              <HymnCardSkeleton key={skeleton} />
            </HymnCardContainer>
          ))}
        {data.map((hymn) => (
          <HymnCardContainer>
            <HymnCard key={hymn.id} hymn={hymn} />
          </HymnCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default HymnGrid;
