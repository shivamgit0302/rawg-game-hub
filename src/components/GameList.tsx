import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import { Platform } from "./PlatformSelector";
import React, { useEffect, useState } from "react";
import { apiClient } from "../services/api-client";
import SkeletonCard from "./CardSkeleton";
import { GamesQuery } from "../App";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface Props {
  gamesQuery: GamesQuery;
}

const GameList = ({ gamesQuery }: Props) => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [isLoading, setLoading] = useState(false);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/games", {
        params: {
          genres: gamesQuery.genre?.id,
          platforms: gamesQuery.platform?.id,
          ordering: gamesQuery.sortValue,
          search: gamesQuery.searchValue,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setGameList(response.data.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [gamesQuery]);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={10}
      p={"10px"}
    >
      {isLoading &&
        skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}

      {gameList.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </SimpleGrid>
  );
};

export default GameList;
