import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { HStack, Stack, Box } from "@chakra-ui/react";
import GameList from "./components/GameList";
import { Genre } from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import { Platform } from "./components/PlatformSelector";

export interface GamesQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortValue: string | "";
  searchValue: string | "";
}

const App = () => {
  const [gamesQuery, setGamesQuery] = useState<GamesQuery>({} as GamesQuery);

  return (
    <>
      <NavBar
        onSearch={(searchValue) =>
          setGamesQuery({ ...gamesQuery, searchValue })
        }
      />
      <HStack alignItems={"start"} justifyContent={"space-between"}>
        <Box width={"250px"}>
          <GenreList
            selectedGenre={gamesQuery.genre}
            onClick={(genre: Genre) => setGamesQuery({ ...gamesQuery, genre })}
          />
        </Box>
        <Stack>
          <GameHeading
            heading={gamesQuery.genre?.name ? gamesQuery.genre?.name : "Games"}
          />
          <HStack>
            <PlatformSelector
              selectedPlatform={gamesQuery.platform}
              onClick={(platform: Platform) =>
                setGamesQuery({ ...gamesQuery, platform })
              }
            />
            <SortSelector
              selectedSortValue={gamesQuery.sortValue}
              onSelect={(sortValue) =>
                setGamesQuery({ ...gamesQuery, sortValue })
              }
            />
          </HStack>
          <GameList gamesQuery={gamesQuery} />
        </Stack>
      </HStack>
    </>
  );
};

export default App;
