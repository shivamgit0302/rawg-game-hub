import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card>
      <Skeleton height={"200px"} />
      <CardBody p={0}>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};
export default SkeletonCard;
