import { Text } from "@chakra-ui/react";
import useHymns from "../../hooks/useHymns";

const HymnGrid = () => {
  const {hymns, error} = useHymns();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {hymns.map((hymn) => (
          <li key={hymn.id}>{hymn.title}</li>
        ))}
      </ul>
    </>
  );
};

export default HymnGrid;
