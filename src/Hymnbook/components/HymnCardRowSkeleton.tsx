import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const HymnCardRowSkeleton = () => {
  return (
    <Card direction={"row"}>
      <Skeleton height={"50px"} />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default HymnCardRowSkeleton;
