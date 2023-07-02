import { SimpleGrid, Text } from "@chakra-ui/react";
import useHymns from "../../hooks/useHymns";
import HymnCard from "./HymnCard";

const HymnGrid = () => {
  const { hymns, error } = useHymns();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{sm:1, md:2, lg:3, xl:5}} spacing={10} padding={'10px'}>
        {hymns.map((hymn) => (
          <HymnCard key={hymn.id} hymn={hymn} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HymnGrid;
