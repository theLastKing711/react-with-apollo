import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import TopAnimeSpreadMain from "../anime/components/topAnimeSpreadMain/TopAnimeSpreadMain";
import { useGetAnimeFullTrendingNow } from "./hook/useGetAnimeFullTrendingNow";
import TopAnimeSpreadListCover from "../anime/components/skeleton/TopAnimeSpreadListCover";
import MainContainer from "../../shared/components/MainContainer";
import { Box } from "@mui/material";
import {
  AIRING_STATUS_LIST,
  ANIME_FORMAT_LIST,
  ANIME_YEARS_LIST_UNTIL_NEXT_YEAR,
  SEASONS_LIST,
  VIEW_TYPES,
} from "../../shared/shared.constants";

import AnimeViewTypesToolBar from "./components/AnimeViewTypesToolBar";
import CharacterAnimeCoverList from "../character/components/CharacterAnimeCoverList";
import MainAnimeList from "../anime/components/MainAnimeList";
import { useResize } from "../../shared/hook/useResize";
import AnimeBigListViewMain from "./components/anime-big-list-view/AnimeBigListViewMain";
import AnimeBigListViewCoverMain from "./components/skeleton/AnimeBigListViewCoverMain";
import useEndOfContentFetchMore from "../../shared/hook/useEndOfContentFetchMore";
import CharacterAnimeCoverListList from "../character/components/CharacterAnimeCoverListList";
import AnimeBigListViewCoverList from "./components/skeleton/AnimeBigListViewCoverList";
import AnimeFilters from "./components/anime-filter/AnimeFilters";
import { useGetAnimeGenreAndTagCollections } from "./hook/useGetAnimeGenreAndTagCollection";
import { AnimeGenreItem } from "../anime/anime.type";
import AnimePageHeader from "../anime/components/AnimePageHeader";

const itemPerPage = 20;

const getFilterItemByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  return list.find(func);
};

const getFilterListByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  return list.filter(func);
};

const AnimeTrendingMain = () => {
  const [activeView, setActiveView] = useState<VIEW_TYPES>("SPREAD");
  const screenWidth = useResize();
  const endOfContent = useRef<null | HTMLDivElement>(null);

  const shouldSpreadViewbeAvailable = screenWidth >= 800;

  const {
    data: trendingNowData,
    loading: trendingNowLoading,
    error: trendingNowError,
    fetchMore,
    navigateFromTrendingPageWithNewParams,
    queryParamFilter,
    updateQueryParams,
    // filterQueryParam,
    filterQueryParamsByKeyAndValue,
    navigateToSearchPageWithNewSortQueryParams,
  } = useGetAnimeFullTrendingNow({
    perPage: itemPerPage,
    sort: ["TRENDING_DESC"],
  });

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

  const isViewActive = (view: VIEW_TYPES) => {
    if (activeView === view) {
      return true;
    }
    return false;
  };

  console.log("trending data", trendingNowData);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useLayoutEffect(() => {
    if (!shouldSpreadViewbeAvailable && isViewActive("SPREAD")) {
      setActiveView("SMALL_GRID");
    }
  }, [shouldSpreadViewbeAvailable]);

  const testing = useEndOfContentFetchMore(
    endOfContent,
    () => {
      if (
        (endOfContent.current?.getBoundingClientRect().bottom || 99999) <=
          window.innerHeight &&
        !isLoadingMore
      ) {
        const nextPage = trendingNowData?.Page.pageInfo.currentPage! + 1;

        console.log("next page", trendingNowData);
        setIsLoadingMore(true);
        fetchMore({
          variables: {
            page: nextPage,
          },
        }).then(() => {
          setIsLoadingMore(false);
        });
      }
    },
    [trendingNowData, isLoadingMore]
  );

  console.log("trendingNowData", trendingNowData);

  const isSearchResultEmpty =
    trendingNowData && trendingNowData.Page.media.length === 0;

  const memoizedGenreList = useMemo(() => {
    return getGenresList();
  }, [animeGenreListData]);

  return (
    <Box
      component="main"
      sx={{
        paddingTop: "2rem",
        backgroundColor: "#EDF1F5",
      }}
      ref={endOfContent}
    >
      <AnimePageHeader>Trending Anime</AnimePageHeader>
      <AnimeFilters
        genreList={memoizedGenreList}
        yearList={ANIME_YEARS_LIST_UNTIL_NEXT_YEAR}
        seasonList={SEASONS_LIST}
        formatList={ANIME_FORMAT_LIST}
        airingStatusList={AIRING_STATUS_LIST}
        searchValue={queryParamFilter.search}
        airingValue={
          getFilterItemByValue(
            [...AIRING_STATUS_LIST],
            (item) => item.value == queryParamFilter.status
          ) || { label: "", value: "" }
        }
        yearValue={
          getFilterItemByValue(
            ANIME_YEARS_LIST_UNTIL_NEXT_YEAR,
            (item) => item.toString() == queryParamFilter.seasonYear
          ) || null
        }
        seasonValue={
          getFilterItemByValue(
            [...SEASONS_LIST],
            (item) => item.value === queryParamFilter.season
          ) || { label: "", value: "" }
        }
        formatValue={getFilterListByValue(
          [...ANIME_FORMAT_LIST],
          (item) => queryParamFilter.format_in?.includes(item.value) || false
        )}
        genreValues={getFilterListByValue([...memoizedGenreList], (item) => {
          return queryParamFilter.genre_in?.includes(item.name) || false;
        })}
        handleSearchChange={(e) =>
          navigateFromTrendingPageWithNewParams("search", e.target.value)
        }
        handleYearChange={(e, year) => {
          if (year) {
            navigateFromTrendingPageWithNewParams(
              "seasonYear",
              year.toString()
            );
          }
        }}
        handleSeasonChange={(e, list) => {
          console.log("change season", list);
          if (list) {
            navigateFromTrendingPageWithNewParams("season", list.value);
          }
        }}
        handleAiringChange={(e, list) => {
          console.log("change airing", list);
          if (list) {
            navigateFromTrendingPageWithNewParams("status", list.value);
          }
        }}
        handleFormatChange={(e, list) => {
          if (list) {
            navigateFromTrendingPageWithNewParams("format_in", list[0].value);
          }
        }}
        handleGenreChange={(e, list) => {
          if (list) {
            navigateFromTrendingPageWithNewParams("genre_in", list[0].name);
          }
        }}
      />
      <AnimeViewTypesToolBar
        isViewActive={isViewActive}
        setViewType={setActiveView}
        shouldDisplaySpreadViewOption={shouldSpreadViewbeAvailable}
        tagsList={[]}
        onTagClicked={filterQueryParamsByKeyAndValue}
        onResetTagClicked={() => {}}
        animeSortFilterProps={{
          onSortValueChange: (value) => {
            navigateToSearchPageWithNewSortQueryParams(value);
          },
          sortValue: "TRENDING_DESC",
        }}
      />
      {isSearchResultEmpty && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: 700,
            padding: "1.25rem",
            color: "rgb(92, 114, 138)",
          }}
        >
          No Result
        </Box>
      )}
      {trendingNowData &&
        shouldSpreadViewbeAvailable &&
        isViewActive("SPREAD") && (
          <TopAnimeSpreadMain
            animeList={trendingNowData.Page.media}
            itemHasRanking={false}
          />
        )}
      {(trendingNowLoading || isLoadingMore) &&
        shouldSpreadViewbeAvailable &&
        isViewActive("SPREAD") && (
          <MainContainer>
            <TopAnimeSpreadListCover
              listCount={itemPerPage}
              hasRanking={false}
            />
          </MainContainer>
        )}
      {trendingNowData && isViewActive("SMALL_GRID") && (
        <MainAnimeList animeList={trendingNowData.Page.media}>
          {isLoadingMore && isViewActive("SMALL_GRID") && (
            <CharacterAnimeCoverListList listCount={itemPerPage} />
          )}
        </MainAnimeList>
      )}
      {trendingNowLoading && isViewActive("SMALL_GRID") && (
        <CharacterAnimeCoverList listCount={itemPerPage} />
      )}
      {trendingNowData && isViewActive("BIG_GRID") && (
        <AnimeBigListViewMain animeList={trendingNowData.Page.media}>
          {isLoadingMore && (
            <AnimeBigListViewCoverList listCount={itemPerPage} />
          )}
        </AnimeBigListViewMain>
      )}
      {(trendingNowLoading || isLoadingMore) && isViewActive("BIG_GRID") && (
        <AnimeBigListViewCoverMain />
      )}
    </Box>
  );
};

export default AnimeTrendingMain;
