import { useMutation } from "@apollo/client";
import { POST_ANIME_MEDIA_LIST_ENTRY } from "../mutations/anime-details.mutation";
import { FuzzyDateInput } from "../../../shared/shared.type";
import { GET_ANIME_MEDIA_LIST_ENTRY } from "../queries/anime-details.query";
import { AnimeAddMediaListEntryResponse } from "../anime-details.type";

interface Props {
    mutationVariables: {
        mediaId: number;
        status?: string;
        score?: number;
        progress?: number; 
        startedAt?: FuzzyDateInput | null | undefined; 
        completedAt?: FuzzyDateInput | null | undefined;
        repeat?: number;
        notes?: string;
        private?: boolean;
    }
}

export const usePostAnimeMediaListEntry = ({mutationVariables}: Props) => { 

    const [
        SaveAnime,
        {
            data,
            loading,
            error 
        },
        ] = useMutation(POST_ANIME_MEDIA_LIST_ENTRY, {
            variables: {
                
            },
        update(cache, { data }) {  
            const newDataFromResponse = (data  as AnimeAddMediaListEntryResponse) 


            cache.writeQuery({
                query: GET_ANIME_MEDIA_LIST_ENTRY,
                variables: {
                    type: "ANIME",
                    id: mutationVariables.mediaId
                },
                
                data: {
                    Media: {
                        mediaListEntry: {
                            ...newDataFromResponse.SaveMediaListEntry
                        }
                    }
                }
            })
        
        },
        });
    

    const AddAnimeToEntryList = ({ mutationVariables }: Props, successCallback: () => void) => {
        
        SaveAnime({variables: {
            ...mutationVariables
        },

        }).then(() => {
            successCallback();
        })
    }

    return {
        data,
        loading,
        AddAnimeToEntryList
    }
    
}