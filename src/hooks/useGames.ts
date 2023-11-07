import { apiClient } from "../services/api-client";
import { GamesQuery } from "../App";
import { useState , useEffect } from "react";
import { Platform } from "../components/PlatformSelector";
import axios , { CanceledError } from "axios";
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
  }

interface FetchGamesResponse {
    count:number;
    results : Game[]

}  
  
const useGamesQuery = (gamesQuery:GamesQuery) => {

  const [gameList, setGameList] = useState<Game[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        signal: controller.signal
      })
      .then((response) => {
        setGameList(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof(CanceledError)) return; 
        setError(err.message)
    });
     return () => controller.abort() 
  }, [gamesQuery]);



  useEffect(() => {
    axios.get('https://metaverse.aidoc.io/api/auth/test')
    .then((response) => {
      console.log(response.data , 'data')
      console.log(response , 'entire response')
    })
    .catch((err) => {
      console.log(err.message, 'error message')
      console.log(err, 'entire error')
    });
  }, []); 
 

  useEffect(() => {
    axios.post('https://metaverse.aidoc.io/api/auth/login', {
      email:'shivam@aimedis.com',
      password:'123456'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  return {gameList, isLoading , error }

}  


export default useGamesQuery


                    