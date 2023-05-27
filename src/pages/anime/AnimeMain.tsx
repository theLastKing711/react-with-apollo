import { Box } from "@mui/material";
import { useResize } from "../../shared/hook/useResize";
import {
  getCurrentYear,
  getNextSeasonName,
  getThisSeasonName,
} from "../../shared/shared.util";
import MainAnimeList from "./components/MainAnimeList";
import TopAnimeSpreadMain from "./components/topAnimeSpreadMain/TopAnimeSpreadMain";
import { useGetAnimeAllTimePopular } from "./hook/useGetAnimeAllTimePopular";
import { useGetAnimeAllTimeTrending } from "./hook/useGetAnimeTrendingNow";
import { useGetMainAnimeList } from "./hook/useGetMainAnimeList";
import { useGetTopAnime } from "./hook/useGetTopAnime";
import MainAnimeListPageCover from "./components/skeleton/MainAnimeListPageCover";
import AnimeFilters from "../anime-trending/components/anime-filter/AnimeFilters";
import { useGetAnimeGenreAndTagCollections } from "../anime-trending/hook/useGetAnimeGenreAndTagCollection";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ANIME_YEARS_LIST_UNTIL_NEXT_YEAR,
  SEASONS_LIST,
  ANIME_FORMAT_LIST,
  AIRING_STATUS_LIST,
} from "../../shared/shared.constants";
import { AnimeGenreItem, AnimeQueryFilter } from "./anime.type";

const AnimeMain = () => {
  const screenWidth = useResize();

  const thisSeasonName = getThisSeasonName();

  const nextSeasonName = getNextSeasonName();

  const currentYear = getCurrentYear();

  const isTopAnimeInMainLayout = screenWidth <= 1000;

  const {
    data: trendingNowData,
    loading: trendingNowLoading,
    error: trendingNowError,
  } = useGetAnimeAllTimeTrending();

  const {
    data: popularThisSeasonData,
    loading: popularThisSeasonLoading,
    error: popularThisSeasonError,
  } = useGetMainAnimeList({
    season: thisSeasonName,
    seasonYear: currentYear,
    sort: "POPULARITY_DESC",
  });

  const {
    data: popularNextSeasonData,
    loading: popularNextSeasonLoading,
    error: popularNextSeasonError,
  } = useGetMainAnimeList({
    season: nextSeasonName,
    seasonYear: currentYear,
    sort: "POPULARITY_DESC",
  });

  const {
    data: allTimePopularData,
    loading: allTimePopularLoading,
    error: allTimePopularError,
  } = useGetAnimeAllTimePopular({});

  const {
    data: topAnimeData,
    loading: topAnimeLoading,
    error: topAnimeError,
  } = useGetTopAnime({});

  const isLoading =
    trendingNowLoading ||
    popularThisSeasonLoading ||
    popularNextSeasonLoading ||
    allTimePopularLoading;

  const navigate = useNavigate();

  const navigateToSeachPage = (key: AnimeQueryFilter, value: string) => {
    const searchPage = "/anime/search";

    const searchPageParams = `?${key}=${value}`;

    const searchPageWithParams = searchPage + searchPageParams;

    navigate(searchPageWithParams);
  };

  const {
    data: animeGenreListData,
    error,
    loading,
  } = useGetAnimeGenreAndTagCollections();

  const getGenresList = () => {
    if (animeGenreListData) {
      const genreList = animeGenreListData?.GenreCollection.map<AnimeGenreItem>(
        (item) => ({
          name: item,
          group: "GENRES",
        })
      );

      const tagsList =
        animeGenreListData?.MediaTagCollection.map<AnimeGenreItem>((item) => ({
          name: item.name,
          group: "TAGS",
        }));

      return [...genreList, ...tagsList];
    }

    return [];
  };

  const memoizedGenreList = useMemo(() => {
    return getGenresList();
  }, [animeGenreListData]);

  return (
    <Box sx={{ backgroundColor: "#EDF1F5" }}>
      <Box sx={{ paddingTop: "2rem" }}>
        <AnimeFilters
          genreList={memoizedGenreList}
          yearList={ANIME_YEARS_LIST_UNTIL_NEXT_YEAR}
          seasonList={SEASONS_LIST}
          formatList={ANIME_FORMAT_LIST}
          airingStatusList={AIRING_STATUS_LIST}
          searchValue={undefined}
          airingValue={{ label: "", value: "" }}
          yearValue={null}
          seasonValue={{ label: "", value: "" }}
          formatValue={[]}
          genreValues={[]}
          handleSearchChange={(e) =>
            navigateToSeachPage("search", e.target.value)
          }
          handleYearChange={(e, year) => {
            if (year) {
              navigateToSeachPage("seasonYear", year.toString());
            }
          }}
          handleSeasonChange={(e, listItem) => {
            if (listItem) {
              navigateToSeachPage("season", listItem?.value);
            }
          }}
          handleAiringChange={(e, listItem) => {
            if (listItem) {
              navigateToSeachPage("status", listItem.value);
            }
          }}
          handleFormatChange={(e, list) => {
            navigateToSeachPage("format_in", list[0].value);
          }}
          handleGenreChange={(e, list) => {
            navigateToSeachPage("genre_in", list[0].name);
          }}
        />
      </Box>
      {isLoading && (
        <MainAnimeListPageCover
          isTopAnimeInMainLayout={isTopAnimeInMainLayout}
        />
      )}

      {trendingNowData && !isLoading && (
        <MainAnimeList
          title="TRENDING NOW"
          link="trending"
          animeList={trendingNowData.Page.media}
        ></MainAnimeList>
      )}
      {popularThisSeasonData && !isLoading && (
        <MainAnimeList
          title="POPULAR THIS SEASON"
          link="this-season"
          animeList={popularThisSeasonData.Page.media}
        ></MainAnimeList>
      )}
      {popularNextSeasonData && !isLoading && (
        <MainAnimeList
          title="POPULAR NEXT SEASON"
          link="next-season"
          animeList={popularNextSeasonData.Page.media}
        ></MainAnimeList>
      )}
      {allTimePopularData && !isLoading && (
        <MainAnimeList
          title="ALL TIME POPULAR"
          link="popular"
          animeList={allTimePopularData.Page.media}
        ></MainAnimeList>
      )}
      <Box sx={{ marginTop: "1rem" }} />

      {topAnimeData && !isTopAnimeInMainLayout && !isLoading && (
        <TopAnimeSpreadMain
          animeList={topAnimeData.Page.media}
          title="TOP 100 ANIME"
          link="top-100"
        />
      )}
      {topAnimeData && isTopAnimeInMainLayout && !isLoading && (
        <MainAnimeList
          animeList={topAnimeData.Page.media}
          title="TOP 100 ANIME"
          link="top-100"
          hasRanking={true}
        ></MainAnimeList>
      )}
    </Box>
  );
};

export default AnimeMain;
