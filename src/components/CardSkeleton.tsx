import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card>
      <Skeleton height={"304px"} width={"306px"} />
      <CardBody p={0}>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};
export default SkeletonCard;
