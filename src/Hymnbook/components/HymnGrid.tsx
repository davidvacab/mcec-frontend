import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Text } from "@chakra-ui/react";

interface Hymn {
  id: number;
  title: string;
}

interface FetchHymnResponse {
  count: number;
  results: Hymn[];
}

const HymnGrid = () => {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchHymnResponse>("/hymnbook/hymns")
      .then((res) => setHymns(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

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
