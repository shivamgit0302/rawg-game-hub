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
 

  // useEffect(() => {
  //   axios.post('https://metaverse.aidoc.io/api/auth/login', {
  //     email:'shivam@aimedis.com',
  //     password:'123456'
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       // Add any other necessary headers here
  //     },
  //   }
  //   )
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);

  useEffect(() => {
    axios.get('https://metaverse.aidoc.io/api/auth/userDetails' , {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IjhqWm9sSTBpOHd2bEp1VUEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk5NjU3ODM5LCJpYXQiOjE2OTkzNTMwMzksImlzcyI6Imh0dHBzOi8veHZibHVxcnhiaXJodHd0c253Zmkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI1ODRlZjZjLTg1ZDItNGJkOS04YjJiLWIxODEzMjdkMWQzYSIsImVtYWlsIjoic2hpdmFtQGFpbWVkaXMuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2OTkzNTMwMzl9XSwic2Vzc2lvbl9pZCI6Ijg1NjRhODVmLTM4M2EtNGYxZS1hOTJiLWYzMTExMzE4ZDVlMyJ9.88mueZGyknyDUXGHpcgbf27XXoyHZ45-mB2qh0xxIF8',
        // Add any other necessary headers here
      },
    })
    .then((response) => {
      console.log(response.data , 'data')
      console.log(response , 'entire response')
    })
    .catch((err) => {
      console.log(err.message, 'error message')
      console.log(err, 'entire error')
    });
  }, []);


  return {gameList, isLoading , error }

}  


export default useGamesQuery


                    