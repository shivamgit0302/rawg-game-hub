import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import SkeletonCard from "./CardSkeleton";
import { GamesQuery } from "../App";
import useGamesQuery from "../hooks/useGames";

interface Props {
  gamesQuery: GamesQuery;
}

const GameList = ({ gamesQuery }: Props) => {
  const { gameList, error, isLoading } = useGamesQuery(gamesQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={10}
      p={"0 20px"}
    >
      {isLoading &&
        skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}

      {error && <Text>{error}</Text>}

      {gameList.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </SimpleGrid>
  );
};

export default GameList;
