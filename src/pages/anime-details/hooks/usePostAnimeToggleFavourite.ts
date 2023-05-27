import { useMutation } from '@apollo/client';
import { POST_ANIME_TOGGLE_FAVOURITE } from "../mutations/anime-details.mutation";
import { AnimeDetails } from '../anime-details.type';
import { GET_ANIME_DETAILS } from '../queries/anime-details.query';
import { ToggleAnimeFavouriteResponse } from '../../anime/anime.type';

export const usePostAnimeToggleFavourite = (id: number, onUpdateCallback: () => void) => { 
    
    const [
        toggleAnimeFavouriteMutation,
        {
            data,
            loading,
            error 
          },
        ] = useMutation(POST_ANIME_TOGGLE_FAVOURITE, {

            update(cache, { data }) { 
                const existingData = cache.readQuery<AnimeDetails>({
                    query: GET_ANIME_DETAILS,
                    variables: {
                        type: "ANIME",
                        id,
                    }
                });
                            
                const newDataFromResponse = data ;
                
                const idsMap = (newDataFromResponse as ToggleAnimeFavouriteResponse)
                                .ToggleFavourite
                                .anime
                                .nodes
                                .map(x => x.id)
                
                const isFavouriteNewValue = (idsMap.includes(id)) ? true : false;
                
                if(newDataFromResponse && existingData) {
                    onUpdateCallback();
                    console.log("writing")
                    cache.writeQuery({
                        query: GET_ANIME_DETAILS,
                        data: {
                            ...existingData,
                            Media: {
                                ...existingData.Media,
                                isFavourite: isFavouriteNewValue
                            }
                        }
                    })
                }
            
            },
            variables: {
                id: id,
            },
            });
    

    const toggleAnimeFavourite = (id: number, successCallback: () => void) => {
        toggleAnimeFavouriteMutation({variables: {
            id
        }}).then(() => {
            successCallback();
        })
    }

    return {
        data,
        loading,
        toggleAnimeFavourite
    }
    
}