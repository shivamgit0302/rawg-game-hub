import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Image,
  HStack,
  Button,
} from "@chakra-ui/react";
import { apiClient } from "../services/api-client";

export interface Genre {
  id: number;
  image_background: string;
  name: string;
}

interface Props {
  selectedGenre: Genre | null;
  onClick: (genre: Genre) => void;
}

const GenreList = ({ selectedGenre, onClick }: Props) => {
  const [genreList, setGenreList] = useState<Genre[]>([]);

  useEffect(() => {
    apiClient
      .get("/genres")
      .then((response) => {
        setGenreList(response.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box p={"0 20px"} width={250}>
      <Heading fontSize="24px" margin={"36px 0px 12px"}>
        Genres ({genreList.length})
      </Heading>
      <List>
        {genreList.map((genre) => (
          <ListItem key={genre.id} paddingY={"5px"}>
            <HStack>
              <Image
                src={genre.image_background}
                boxSize={"32px"}
                objectFit={"cover"}
                borderRadius={5}
              />
              <Button
                textAlign="left"
                colorScheme="gray"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                fontSize="md"
                variant="link"
                onClick={() => {
                  onClick(genre);
                }}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
