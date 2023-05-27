import { useQuery } from "@apollo/client";
import { AnimeStreamingEpisodesResponse } from "../anime-details.type";
import { GET_ANIME_STREAMING_EPISODES, } from "../queries/anime-details.query";

interface Props {
  id: number;
}

export const useGetAnimeStreamingEpisodes = ({ id }: Props) => {
  const { data, loading, error } = useQuery<AnimeStreamingEpisodesResponse>(
    GET_ANIME_STREAMING_EPISODES,
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
