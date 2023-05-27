import { CharacterDetails } from './../character.type';
import { GET_CHARACTER_DETAILS } from './../queries/character.query';
import {useQuery } from "@apollo/client";


export const useGetCharacterDetails = (id: number) => { 

    const { loading, error, data, refetch, networkStatus } = 
     useQuery<CharacterDetails>(GET_CHARACTER_DETAILS, {
        variables: {
            id,
        },
        // notifyOnNetworkStatusChange: true,
      });
    
    return {
        loading,
        error,
        data,
        refetch,
        networkStatus
    }
    
}