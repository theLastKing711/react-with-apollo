import { useQuery } from "@apollo/client";
import { AnimeDetails, AnimeStatsResponse } from "../anime-details.type";
import { GET_ANIME_STATS } from "../queries/anime-details.query";

interface Props {
  id: number;
}

export const useGetAnimeStats = ({ id }: Props) => {
  const { data, loading, error } = useQuery<AnimeStatsResponse>(
    GET_ANIME_STATS,
    {
      variables: {
        id,
        type: "ANIME",
      },
    }
  );

  return {
    data,
    loading,
  };
};
