import { useQuery } from "@apollo/client";
import {
  ANIME_FORMAT_LIST,
  ANIME_LIST_SORT_OPTIONS_TYPES,
} from "../../../shared/shared.constants";
import { GET_ANIME_FULL_TRENDING_NOW } from "../queries/anime-trending.query";
import {
  AnimeListPage,
  AnimeQueryFilter,
  AnimeTagFilterItem,
  Season,
  TopAnime,
  queryParamFilterType,
} from "../../anime/anime.type";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isArray } from "lodash";
import { useMemo } from "react";

interface useGetTopAnimeProps {
  perPage?: number;
  page?: number;
  search?: string;
  sort?: ANIME_LIST_SORT_OPTIONS_TYPES[];
  season?: Season;
  seasonYear?: number;
  genre_not_in?: string[];
  genre_in?: string[];
  format_not_in?: Array<(typeof ANIME_FORMAT_LIST)[number]["value"]>;
  format_in?: Array<(typeof ANIME_FORMAT_LIST)[number]["value"]>;
  status?: string;
}

export const useGetAnimeFullTrendingNow = ({
  perPage = 10,
  page = 1,
  search,
  sort,
  season,
  seasonYear,
  genre_not_in = [],
  genre_in = [],
  format_not_in = [],
  format_in = [],
  status,
}: useGetTopAnimeProps) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useSearchParams({});

  console.log("queryParams", queryParams.entries());

  const updateQueryParams = (key: string, value: string | string[]) => {
    setQueryParams((prev) => {
      console.log("prev", prev.entries);

      if (isArray(value)) {
        prev.delete(key);
        for (const val of value) {
          prev.append(key, val);
        }
      } else {
        prev.set(key, value);
      }

      return prev;
    });
  };

  const filterQueryParam = (key: string) => {
    setQueryParams((prev) => {
      prev.delete(key);

      return prev;
    });
  };

  const filterQueryParamsByKeyAndValue = (tag: AnimeTagFilterItem) => {
    setQueryParams((prev) => {
      const refList = prev.getAll(tag.key).filter((item) => item !== tag.value);

      console.log("ref list", refList);

      prev.delete(tag.key);

      refList.forEach((x) => {
        prev.append(tag.key, x);
      });

      return prev;
    });
  };

  const FilterQueryParamsByKey = (key: AnimeQueryFilter) => {
    const currentLocationPath = location.pathname;
    const currentSearch = location.search;

    const filterdQueryValue = queryParams.get(key);

    const queryValueWithKey = `${key}=${filterdQueryValue}`;

    const newQueryParams = currentSearch.replace(queryValueWithKey, "");

    let newLocation = currentLocationPath + newQueryParams;

    if (newQueryParams.length === 1) {
      newLocation = newLocation.replace("$", "");
    }

    navigate(newLocation);
  };

  const navigateToSearchPageWithNewQueryParams = (
    key: AnimeQueryFilter,
    value: string | string[],
    pageSortValue: ANIME_LIST_SORT_OPTIONS_TYPES,
    extraValues?: { key: string; value: string }[]
  ) => {
    const newLocationpath = "/anime/search";

    let queryParam = `?${key}=${value}&sort=${pageSortValue}`;

    if (extraValues) {
      for (const item of extraValues) {
        queryParam += `&${item.key}=${item.value}`;
      }
    }

    const newLocation = newLocationpath + queryParam;

    navigate(newLocation);
  };

  const navigateFromTrendingPageWithNewParams = (
    key: AnimeQueryFilter,
    value: string | string[]
  ) => {
    navigateToSearchPageWithNewQueryParams(key, value, "TRENDING_DESC");
  };

  const navigateFromPopularThisSeasonPageWithNewParams = (
    key: AnimeQueryFilter,
    value: string | string[],
    extraValues: { key: string; value: string }[]
  ) => {
    navigateToSearchPageWithNewQueryParams(
      key,
      value,
      "POPULARITY_DESC",
      extraValues
    );
  };

  const navigateFromtopOneHundrendPageWithNewParams = (
    key: AnimeQueryFilter,
    value: string | string[],
    extraValues: { key: string; value: string }[]
  ) => {
    navigateToSearchPageWithNewQueryParams(
      key,
      value,
      "SCORE_DESC",
      extraValues
    );
  };

  const navigateFromPopularNextSeasonPageWithNewParams = (
    key: AnimeQueryFilter,
    value: string | string[],
    extraValues: { key: string; value: string }[]
  ) => {
    navigateToSearchPageWithNewQueryParams(
      key,
      value,
      "POPULARITY_DESC",
      extraValues
    );
  };

  const navigateToSearchPageWithNewSortQueryParams = (
    pageSortValue: string
  ) => {
    const newLocationpath = "/anime/search";

    const queryParam = `?sort=${pageSortValue}`;

    const newLocation = newLocationpath + queryParam;

    navigate(newLocation);
  };

  const searchQueryParam = queryParams.get("search")?.valueOf();
  const sortQueryParam = queryParams.get("sort")?.valueOf();
  const seasonQueryParam = queryParams.get("season")?.valueOf();
  const seasonYearQueryParam = queryParams.get("seasonYear")?.valueOf();
  const genreNotInQueryParam = queryParams.get("genre_not_in")?.valueOf();
  const genreInQueryParam =
    queryParams.getAll("genre_in").length > 0
      ? queryParams.getAll("genre_in")
      : undefined;
  const formatNotInQueryParam = queryParams.get("format_not_in")?.valueOf();
  const formatInQueryParam =
    queryParams.getAll("format_in").length > 0
      ? queryParams.getAll("format_in")
      : undefined;
  const statusQueryParam = queryParams.get("status")?.valueOf();

  console.log("initalSort", sort);

  const { data, error, loading, fetchMore } = useQuery<AnimeListPage<TopAnime>>(
    GET_ANIME_FULL_TRENDING_NOW,
    {
      variables: {
        perPage,
        page,
        search: searchQueryParam,
        sort: sort || sortQueryParam,
        season: seasonQueryParam,
        seasonYear: seasonYearQueryParam,
        genre_not_in: genreNotInQueryParam,
        genre_in: genreInQueryParam,
        format_not_in: formatNotInQueryParam,
        format_in: formatInQueryParam,
        status: statusQueryParam,
      },
    }
  );

  const queryParamFilter: queryParamFilterType = {
    search: searchQueryParam,
    sort: sortQueryParam,
    season: seasonQueryParam,
    seasonYear: seasonYearQueryParam,
    genre_not_in: genreNotInQueryParam,
    genre_in: genreInQueryParam,
    format_not_in: formatNotInQueryParam,
    format_in: formatInQueryParam,
    status: statusQueryParam,
    status_not_in: undefined,
  };

  const getTagsList = (): AnimeTagFilterItem[] => {
    let tags: AnimeTagFilterItem[] = [];

    queryParams.forEach((value, key) => {
      if (key !== "sort" && key !== "search") {
        tags.push({ key, value });
      }
    });

    return tags;
  };

  const resetQueryParams = () => {
    let deletedItems: string[] = [];

    setQueryParams((prev) => {
      prev.forEach((value, key) => {
        console.log("key value", key);
        console.log("key value", value);
        if (key !== "sort") {
          deletedItems.push(key);
        }
      });

      deletedItems.forEach((value) => prev.delete(value));

      return prev;
    });
  };

  const tagsLIst = useMemo(() => {
    return getTagsList();
  }, [queryParams]);

  return {
    data,
    hasNextPage: data?.Page.pageInfo.hasNextPage,
    error,
    loading,
    fetchMore,
    updateQueryParams,
    FilterQueryParamsByKey,
    navigateToSearchPageWithNewQueryParams,
    navigateFromTrendingPageWithNewParams,
    filterQueryParam,
    queryParamFilter,
    tagsLIst,
    filterQueryParamsByKeyAndValue,
    resetQueryParams,
    navigateToSearchPageWithNewSortQueryParams,
    navigateFromPopularThisSeasonPageWithNewParams,
    navigateFromPopularNextSeasonPageWithNewParams,
    navigateFromtopOneHundrendPageWithNewParams,
  };
};
