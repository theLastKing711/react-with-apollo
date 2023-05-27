import { useQuery } from "@apollo/client";
import { AnimeMediaListEntryResponse } from "../anime-details.type";
import { GET_ANIME_MEDIA_LIST_ENTRY } from "../queries/anime-details.query";

export const useGetAnimeMediaListEntry = (id: number) => {
  const { data, loading, error } = useQuery<AnimeMediaListEntryResponse>(
    GET_ANIME_MEDIA_LIST_ENTRY,
    {
      fetchPolicy: 'network-only',
      variables: {
        id,
        type: "ANIME",
      },
    },
  );

  return {
    data,
    loading,
  };
};
