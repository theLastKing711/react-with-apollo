import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import TopAnimeSpreadMain from "../anime/components/topAnimeSpreadMain/TopAnimeSpreadMain";
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
import useEndOfContentFetchMore from "../../shared/hook/useEndOfContentFetchMore";
import { useResize } from "../../shared/hook/useResize";
import AnimeViewTypesToolBar from "../anime-trending/components/AnimeViewTypesToolBar";
import AnimeBigListViewMain from "../anime-trending/components/anime-big-list-view/AnimeBigListViewMain";
import AnimeFilters from "../anime-trending/components/anime-filter/AnimeFilters";
import AnimeBigListViewCoverList from "../anime-trending/components/skeleton/AnimeBigListViewCoverList";
import AnimeBigListViewCoverMain from "../anime-trending/components/skeleton/AnimeBigListViewCoverMain";
import { useGetAnimeFullTrendingNow } from "../anime-trending/hook/useGetAnimeFullTrendingNow";
import { useGetAnimeGenreAndTagCollections } from "../anime-trending/hook/useGetAnimeGenreAndTagCollection";
import { AnimeGenreItem } from "../anime/anime.type";
import MainAnimeList from "../anime/components/MainAnimeList";
import CharacterAnimeCoverList from "../character/components/CharacterAnimeCoverList";
import CharacterAnimeCoverListList from "../character/components/CharacterAnimeCoverListList";

const itemPerPage = 20;

const getFilterItemByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  const newLIst = list.find(func);

  console.log("testingss", newLIst);

  return newLIst;
};

const getFilterListByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  const filterdList = list.filter(func);

  return filterdList;
};

const AnimeSearchMain = () => {
  const [activeView, setActiveView] = useState<VIEW_TYPES>("SPREAD");
  const screenWidth = useResize();
  const endOfContent = useRef<null | HTMLDivElement>(null);

  const shouldSpreadViewbeAvailable = screenWidth >= 800;

  const {
    data: trendingNowData,
    hasNextPage,
    loading: trendingNowLoading,
    error: trendingNowError,
    fetchMore,
    updateQueryParams,
    filterQueryParam,
    queryParamFilter,
    tagsLIst,
    filterQueryParamsByKeyAndValue,
    resetQueryParams,
    navigateToSearchPageWithNewSortQueryParams,
  } = useGetAnimeFullTrendingNow({
    perPage: itemPerPage,
  });

  const {
    data: animeGenreListData,
    error,
    loading,
  } = useGetAnimeGenreAndTagCollections();

  const getGenresList = () => {
    console.log("hello world");

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
        (endOfContent.current?.getBoundingClientRect().bottom || 9999999) <=
          window.innerHeight &&
        !isLoadingMore &&
        hasNextPage
      ) {
        const nextPage = trendingNowData?.Page.pageInfo.currentPage! + 1;
        console.log("is loading", isLoadingMore);
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
    [trendingNowData, isLoadingMore, hasNextPage]
  );

  const memoizedGenreList = useMemo(() => {
    return getGenresList();
  }, [animeGenreListData]);

  const isSearchResultEmpty =
    trendingNowData && trendingNowData.Page.media.length === 0;

  return (
    <Box
      component="main"
      sx={{
        paddingTop: "2rem",
        backgroundColor: "#EDF1F5",
      }}
      ref={endOfContent}
    >
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
        handleSearchChange={(e) => {
          if (e.target.value) {
            updateQueryParams("search", e.target.value);
          } else {
            filterQueryParam("search");
          }
        }}
        handleYearChange={(e, year) => {
          if (year) {
            updateQueryParams("seasonYear", year.toString());
          } else {
            filterQueryParam("seasonYear");
          }
        }}
        handleSeasonChange={(e, item) => {
          if (item) {
            updateQueryParams("season", item.value);
          } else {
            filterQueryParam("season");
          }
        }}
        handleAiringChange={(e, item) => {
          console.log("item change", item);
          if (item) {
            updateQueryParams("status", item.value);
          } else {
            filterQueryParam("status");
          }
        }}
        handleFormatChange={(e, list) => {
          console.log("list change", list);
          if (list && list.length > 0) {
            updateQueryParams(
              "format_in",
              list.map((x) => x.value)
            );
          } else {
            filterQueryParam("format_in");
          }
        }}
        handleGenreChange={(e, list) => {
          if (list && list.length > 0) {
            updateQueryParams(
              "genre_in",
              list.map((x) => x.name)
            );
          } else {
            filterQueryParam("genre_in");
          }
        }}
      />

      <AnimeViewTypesToolBar
        isViewActive={isViewActive}
        setViewType={setActiveView}
        shouldDisplaySpreadViewOption={shouldSpreadViewbeAvailable}
        tagsList={tagsLIst}
        onTagClicked={filterQueryParamsByKeyAndValue}
        onResetTagClicked={resetQueryParams}
        animeSortFilterProps={{
          onSortValueChange: (value) => {
            updateQueryParams("sort", value);
          },

          sortValue: queryParamFilter.sort || "TITLE_ENGLISH",
        }}
      />

      {isSearchResultEmpty && (
        <MainContainer>
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
        </MainContainer>
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

export default AnimeSearchMain;
