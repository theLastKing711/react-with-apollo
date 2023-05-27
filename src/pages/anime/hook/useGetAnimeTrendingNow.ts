import { useQuery } from "@apollo/client";
import { AnimeListPage, AnimeMain } from "../anime.type";
import { GET_ANIME_TRENDING_NOW } from "../queries/anime.query";
import { ANIME_LIST_SORT_OPTIONS } from "../../../shared/shared.constants";

interface useGetAnimeAllTimeTrendingProps {
  perPage?: number;
}

export const useGetAnimeAllTimeTrending = () => {
  
  const { data, error, loading } = useQuery<AnimeListPage<AnimeMain>>(
    GET_ANIME_TRENDING_NOW,
    {
      variables: {
        perPage: 6,
        sort: ANIME_LIST_SORT_OPTIONS.TRENDING_DESC,
      },
    }
  );

  return {
    data,
    error,
    loading,
  };
};
