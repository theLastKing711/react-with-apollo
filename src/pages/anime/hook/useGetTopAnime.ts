import { useQuery } from "@apollo/client";
import { AnimeListPage, AnimeMain, TopAnime } from "../anime.type";
import { GET_ANIME_ALL_TIME_POPULAR } from "../queries/anime.query";
import { ANIME_LIST_SORT_OPTIONS } from "../../../shared/shared.constants";

interface useGetTopAnimeProps {
  perPage?: number;
}

export const useGetTopAnime = ({
  perPage = 10,
}: useGetTopAnimeProps) => {
  const { data, error, loading } = useQuery<AnimeListPage<TopAnime>>(
    GET_ANIME_ALL_TIME_POPULAR,
    {
      variables: {
        perPage,
        sort: ANIME_LIST_SORT_OPTIONS.SCORE_DESC,
      },
    }
  );

  return {
    data,
    error,
    loading,
  };
};
