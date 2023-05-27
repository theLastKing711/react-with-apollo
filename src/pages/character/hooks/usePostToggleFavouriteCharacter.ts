import { useMutation } from "@apollo/client";
import { POST_TOGGLE_FAVOURITE_CHARACTER } from "../queries/character.mutation";

import { CharacterToggleFavourite } from "../character.type";
import { useState } from "react";

export const usePostToggleFavouriteCharacter = (id: number, handleToggleSuccess?: () => void) => { 

    const [favouriteStatus, setFavouriteStatus] = useState<undefined | boolean>(undefined);

    const [
        toggleFavouriteCharacterMutation,
        {
          data: toggleFavouriteCharacterData,
          loading: toggleFavouriteCharacterLoading,
          error: toggleFavoriteCharacterError 
        },
        ] = useMutation(POST_TOGGLE_FAVOURITE_CHARACTER, {
            variables: {
                characterId: id,
            },
            onCompleted(data: CharacterToggleFavourite) {

                const isToggled = !!data.ToggleFavourite.characters.nodes.find(x => x.id == id)
                
                // setFavouriteStatus(isToggled);
                
                if(handleToggleSuccess)
                {
                    handleToggleSuccess();
                }
               
                // handleCompletion();
            }
            // refetchQueries: [
            //     {
            //         query: GET_CHARACTERS
            //     }
            // ]
            });
    

    const toggleFavouriteCharacter = (id: number) => {
        toggleFavouriteCharacterMutation({variables: {
            characterId: id
        }})
    }

    return {
        favouriteStatus,
        toggleFavouriteCharacter,
        toggleFavouriteCharacterData,
        toggleFavouriteCharacterLoading,
        toggleFavoriteCharacterError
    }
    
}