import React from "react";
import { Heading } from "@chakra-ui/react";

interface Props {
  heading: string;
}

const GameHeading = ({ heading }: Props) => {
  return (
    <Heading fontSize="48px" margin={"20px 0"} pl={"8px"}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
