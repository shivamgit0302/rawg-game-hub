import { apiClient } from "../services/api-client";
import { GamesQuery } from "../App";
import { useState, useEffect } from "react";
import { Platform } from "../components/PlatformSelector";
import axios, { CanceledError } from "axios";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGamesQuery = (gamesQuery: GamesQuery) => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", {
        params: {
          genres: gamesQuery.genre?.id,
          platforms: gamesQuery.platform?.id,
          ordering: gamesQuery.sortValue,
          search: gamesQuery.searchValue,
        },
        signal: controller.signal,
      })
      .then((response) => {
        setGameList(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [gamesQuery]);

  return { gameList, isLoading, error };
};

export default useGamesQuery;
