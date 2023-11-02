import React from "react";
import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Props } from "./SearchInput";

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack p={"10px"}>
      <Image src={logo} alt="logo" boxSize="60px" />
      <SearchInput onSearch={(searchValue) => onSearch(searchValue)} />
      <ColorModeSwitcher />
    </HStack>
  );
};

export default NavBar;
