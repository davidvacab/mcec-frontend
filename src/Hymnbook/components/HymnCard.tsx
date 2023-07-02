import { Card, CardBody, Heading } from "@chakra-ui/react";
import { Hymn } from "../../hooks/useHymns";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <CardBody>
        <Heading fontSize={'2xl'}>{hymn.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default HymnCard;
