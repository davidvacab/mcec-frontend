import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const HymnCardSkeleton = () => {
  return (
    <Card direction={"row"}>
      <Skeleton height={"50px"}/>
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default HymnCardSkeleton;
