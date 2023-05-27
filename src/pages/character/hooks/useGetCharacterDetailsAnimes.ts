import { CharacterDetailsAnimeList } from './../character.type';
import {  GET_CHARACTER_DETAILS_ANIMES } from './../queries/character.query';
import { useQuery } from "@apollo/client";


export const useGetCharacterDetailsAnimes = 
(
    id: number,
   sort: string,
   handleSuccess?: (newAnimeList: CharacterDetailsAnimeList) => void
) => { 

    const { data, loading, error, refetch}  = useQuery<CharacterDetailsAnimeList>
    (
      GET_CHARACTER_DETAILS_ANIMES,
      {
        variables: {
            id,
            sort
        },
      }
    );
    
    return {
      data,
      loading,
      error,
      refetch
    }
    
}
