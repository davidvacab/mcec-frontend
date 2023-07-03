import { SimpleGrid, Text } from "@chakra-ui/react";
import useHymns from "../../hooks/useHymns";
import HymnCard from "./HymnCard";
import HymnCardSkeleton from "../HymnCardSkeleton";

const HymnGrid = () => {
  const { hymns, error, isLoading } = useHymns();
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
          skeletons.map((skeleton) => <HymnCardSkeleton key={skeleton} />)}
        {hymns.map((hymn) => (
          <HymnCard key={hymn.id} hymn={hymn} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HymnGrid;
