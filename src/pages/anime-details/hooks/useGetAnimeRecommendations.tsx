import { useQuery } from "@apollo/client";
import { AnimeDetailsRecommendationResponse } from "../anime-details.type";
import { GET_ANIME_RECOMMENDATIONS } from "../queries/anime-details.query";

interface Props {
  id: number;
}

export const useGetAnimeRecommendations = ({ id }: Props) => {
  const { data, loading, error } = useQuery<AnimeDetailsRecommendationResponse>(
    GET_ANIME_RECOMMENDATIONS,
    {
      variables: {
        type: "ANIME",
        id,
      },
    }
  );

  return {
    data,
    loading,
  };
};
