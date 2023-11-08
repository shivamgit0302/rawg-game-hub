import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card width={'300px'} overflow={'hidden'} borderRadius={10}>
      <Skeleton height={"200px"} />
      <CardBody p={'20px'}>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};
export default SkeletonCard;
