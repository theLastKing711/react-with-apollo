import { useMutation } from '@apollo/client';
import { POST_ANIME_SAVE_RECOMMENDATION } from "../mutations/anime-details.mutation";
import { RecommendationRating } from '../../../shared/shared.type';
import { AnimeDetailsOverview, AnimeDetailsRecommendationResponse } from '../anime-details.type';
import { GET_ANIME_RECOMMENDATIONS } from '../queries/anime-details.query';
import { SaveAnimeRecommendationResponse } from '../../anime/anime.type';

interface Props {
    mediaId: number;
    rating: RecommendationRating;
    mediaRecommendationId: number;
}

export const usePostAnimeSaveRecommendation = ({mediaId, rating, mediaRecommendationId}: Props) => { 

    const [
        toggleAnimeSaveRecommendationMutation,
        {
            data,
            loading,
            error 
          },
        ] = useMutation(POST_ANIME_SAVE_RECOMMENDATION, {
            // update(cache, { data }) { 


            //     console.log("new data first", data)
                

            //     const newDataFromResponse = (data as SaveAnimeRecommendationResponse).SaveRecommendation;

            //     const existingData = cache.readQuery<AnimeDetailsRecommendationResponse>({
            //         query: GET_ANIME_RECOMMENDATIONS
            //     });

            //     console.log("new data second", existingData);
                
            //     if(newDataFromResponse && existingData) {

            //         cache.writeQuery({
            //             query: GET_ANIME_RECOMMENDATIONS,
            //             data: {
            //                 ...existingData.Media.recommendations,
            //                 recommendations: {
            //                     ...existingData.Media.recommendations,
            //                     nodes: existingData.Media.recommendations.nodes.map((item, index) => {
            //                         if(item.mediaRecommendation.id === newDataFromResponse.id)
            //                         return {...item, rating: newDataFromResponse.rating, userRating: newDataFromResponse.userRating}

            //                         return item;
            //                     })
            //                 }
                            
            //             }
            //         })
            //     }
            
            // },
            variables: {
                mediaId,
                rating,
                mediaRecommendationId
            },
            });
    

    const toggleAnimeSaveRecommendation = ({ rating, mediaRecommendationId}: {rating: RecommendationRating, mediaRecommendationId: number}) => {
        toggleAnimeSaveRecommendationMutation({variables: {
            mediaId,
            mediaRecommendationId,
            rating
        }})
    }

    return {
        data,
        loading,
        toggleAnimeSaveRecommendation
    }
    
}