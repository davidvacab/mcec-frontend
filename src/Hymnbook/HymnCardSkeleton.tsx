import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

const HymnCardSkeleton = () => {
  return (
    <Card>
      <Skeleton
        height={"200px"}
        maxWidth={"350px"}
        borderRadius={10}
        overflow={"hidden"}
        bg={useColorModeValue("gray.100", "gray.700")}
      />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default HymnCardSkeleton;
