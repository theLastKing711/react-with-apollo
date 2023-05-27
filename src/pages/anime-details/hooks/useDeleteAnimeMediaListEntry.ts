import { useMutation } from "@apollo/client";
import { DELETE_ANIME_MEDIA_LIST_ENTRY } from "../mutations/anime-details.mutation";
import { GET_ANIME_MEDIA_LIST_ENTRY } from "../queries/anime-details.query";

export const useDeleteAnimeMediaListEntry = (id: number) => { 

    const [
        DeleteAnime,
        {
            data,
            loading,
            error 
        },
        ] = useMutation(DELETE_ANIME_MEDIA_LIST_ENTRY, {
            variables: {
                id
            },
            refetchQueries: [
                GET_ANIME_MEDIA_LIST_ENTRY
            ]
        });
    

    const DeleteAnimeEntry = (id: number, successCallback: () => void) => {

        console.log("id", id)
        
        DeleteAnime({variables: {
            id
        }}).then(() => {
            successCallback();
        })
    }

    return {
        data,
        loading,
        DeleteAnimeEntry
    }
    
}