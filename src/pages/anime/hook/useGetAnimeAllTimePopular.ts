import { useQuery } from "@apollo/client";
import { AnimeListPage, TopAnime } from "../anime.type";
import { GET_ANIME_ALL_TIME_POPULAR } from "../queries/anime.query";
import { ANIME_LIST_SORT_OPTIONS } from "../../../shared/shared.constants";

interface useGetAnimeAllTimePopularProps {
  perPage?: number;
}

export const useGetAnimeAllTimePopular = ({
  perPage = 6,
}: useGetAnimeAllTimePopularProps) => {
  const { data, error, loading } = useQuery<AnimeListPage<TopAnime>>(
    GET_ANIME_ALL_TIME_POPULAR,
    {
      variables: {
        perPage,
        sort: ANIME_LIST_SORT_OPTIONS.POPULARITY_DESC,
      },
    }
  );

  return {
    data,
    error,
    loading,
  };
};
