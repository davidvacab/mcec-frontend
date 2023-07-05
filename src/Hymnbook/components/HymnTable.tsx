import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useHymns from "../hooks/useHymns";
import { HymnQuery } from "./Hymnbook";

interface Props {
  hymnQuery: HymnQuery;
}

const HymnTable = ({ hymnQuery }: Props) => {
  const { data, error } = useHymns(hymnQuery);

  if (error) return <Text>{error}</Text>;

  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Repertorio MCEC</TableCaption>
        <Thead>
          <Tr>
            <Th>Titulo</Th>
            <Th>Tema</Th>
            <Th>Autor</Th>
            <Th>Arreglista</Th>
            <Th>Fecha de Publicacion</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((hymn) => (
            <Tr key={hymn.id} onClick={() => console.log(hymn.title)}>
              <Th>{hymn.title}</Th>
              <Th>{hymn.topic.title}</Th>
              <Th>
                {hymn.author &&
                  hymn.author.first_name + " " + hymn.author.last_name}
              </Th>
              <Th>
                {hymn.arranger &&
                  hymn.arranger.first_name + " " + hymn.arranger.last_name}
              </Th>
              <Th>{hymn.release_date}</Th>
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default HymnTable;
