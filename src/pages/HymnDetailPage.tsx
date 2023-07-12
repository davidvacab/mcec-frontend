import { useParams } from "react-router-dom";
import useHymn from "../Hymnbook/hooks/useHymn";
import { Heading, Spinner, Text } from "@chakra-ui/react";

const HymnDetailPage = () => {
  const { id } = useParams();
  const { data: hymn, isLoading, error } = useHymn(id!);

  if (isLoading) return <Spinner />;

  if (error || !hymn) throw error;

  return (
    <>
      <Heading>{hymn.title}</Heading>
      <Text>{hymn.release_date}</Text>
    </>
  );
};

export default HymnDetailPage;
