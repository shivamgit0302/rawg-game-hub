import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { Box, Grid, GridItem, Show, Flex } from "@chakra-ui/react";
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
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchValue) =>
            setGamesQuery({ ...gamesQuery, searchValue })
          }
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gamesQuery.genre}
            onClick={(genre: Genre) => setGamesQuery({ ...gamesQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading
            heading={gamesQuery.genre?.name ? gamesQuery.genre?.name : "Games"}
          />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatform={gamesQuery.platform}
                onClick={(platform: Platform) =>
                  setGamesQuery({ ...gamesQuery, platform })
                }
              />
            </Box>
            <SortSelector
              selectedSortValue={gamesQuery.sortValue}
              onSelect={(sortValue) =>
                setGamesQuery({ ...gamesQuery, sortValue })
              }
            />
          </Flex>
        </Box>
        <GameList gamesQuery={gamesQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;
