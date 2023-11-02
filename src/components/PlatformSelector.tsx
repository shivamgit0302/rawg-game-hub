import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { apiClient } from "../services/api-client";
import React, { useEffect, useState } from "react";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  selectedPlatform: Platform | null;
  onClick: (platform: Platform) => void;
}

const PlatformSelector = ({ selectedPlatform, onClick }: Props) => {
  const [platformList, setPlatformList] = useState<Platform[]>([]);

  console.log(selectedPlatform, "selectedPlatform");

  useEffect(() => {
    apiClient
      .get("/platforms")
      .then((response) => {
        console.log(response.data.results);
        setPlatformList(response.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box pl={"10px"} mr={"10px"}>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          {selectedPlatform ? selectedPlatform.name : "Platforms"}
        </MenuButton>
        <MenuList>
          {platformList.map((platform) => (
            <MenuItem
              key={platform.id}
              value={platform.name}
              onClick={() => onClick(platform)}
            >
              {platform.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default PlatformSelector;
