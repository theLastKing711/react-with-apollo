import { Box } from "@mui/material";
import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../shared/components/MainContainer";
import useEndOfContentFetchMore from "../../shared/hook/useEndOfContentFetchMore";
import { useResize } from "../../shared/hook/useResize";
import {
  VIEW_TYPES,
  ANIME_YEARS_LIST_UNTIL_NEXT_YEAR,
  SEASONS_LIST,
  ANIME_FORMAT_LIST,
  AIRING_STATUS_LIST,
} from "../../shared/shared.constants";
import { getNextSeasonName, getCurrentYear } from "../../shared/shared.util";
import AnimeViewTypesToolBar from "../anime-trending/components/AnimeViewTypesToolBar";
import AnimeBigListViewMain from "../anime-trending/components/anime-big-list-view/AnimeBigListViewMain";
import AnimeFilters from "../anime-trending/components/anime-filter/AnimeFilters";
import AnimeBigListViewCoverList from "../anime-trending/components/skeleton/AnimeBigListViewCoverList";
import AnimeBigListViewCoverMain from "../anime-trending/components/skeleton/AnimeBigListViewCoverMain";
import { useGetAnimeFullTrendingNow } from "../anime-trending/hook/useGetAnimeFullTrendingNow";
import { useGetAnimeGenreAndTagCollections } from "../anime-trending/hook/useGetAnimeGenreAndTagCollection";
import { AnimeGenreItem } from "../anime/anime.type";
import AnimePageHeader from "../anime/components/AnimePageHeader";
import MainAnimeList from "../anime/components/MainAnimeList";
import TopAnimeSpreadListCover from "../anime/components/skeleton/TopAnimeSpreadListCover";
import TopAnimeSpreadMain from "../anime/components/topAnimeSpreadMain/TopAnimeSpreadMain";
import CharacterAnimeCoverList from "../character/components/CharacterAnimeCoverList";
import CharacterAnimeCoverListList from "../character/components/CharacterAnimeCoverListList";

const itemPerPage = 20;

const getFilterItemByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  return list.find(func);
};

const getFilterListByValue = <T,>(list: T[], func: (item: T) => boolean) => {
  return list.filter(func);
};

const AnimeTopOneHundredMain = () => {
  const [activeView, setActiveView] = useState<VIEW_TYPES>("SPREAD");
  const screenWidth = useResize();
  const endOfContent = useRef<null | HTMLDivElement>(null);

  const shouldSpreadViewbeAvailable = screenWidth >= 800;

  const nextSeason = getNextSeasonName();

  const currentYear = getCurrentYear();

  const {
    data: trendingNowData,
    loading: trendingNowLoading,
    error: trendingNowError,
    fetchMore,
    navigateFromtopOneHundrendPageWithNewParams,
    queryParamFilter,
    filterQueryParamsByKeyAndValue,
    navigateToSearchPageWithNewSortQueryParams,
  } = useGetAnimeFullTrendingNow({
    perPage: itemPerPage,
    sort: ["SCORE_DESC"],
    seasonYear: currentYear,
    season: nextSeason,
  });

  const {
    data: animeGenreListData,
    error,
    loading,
  } = useGetAnimeGenreAndTagCollections();

  const navigate = useNavigate();

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
      <AnimePageHeader>Top 100 Anime</AnimePageHeader>
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
          navigateFromtopOneHundrendPageWithNewParams(
            "search",
            e.target.value,
            []
          )
        }
        handleYearChange={(e, year) => {
          if (year) {
            navigateFromtopOneHundrendPageWithNewParams(
              "seasonYear",
              year.toString(),
              []
            );
          }
        }}
        handleSeasonChange={(e, list) => {
          console.log("change season", list);
          if (list) {
            navigateFromtopOneHundrendPageWithNewParams(
              "season",
              list.value,
              []
            );
          }
        }}
        handleAiringChange={(e, list) => {
          console.log("change airing", list);
          if (list) {
            navigateFromtopOneHundrendPageWithNewParams(
              "status",
              list.value,
              []
            );
          }
        }}
        handleFormatChange={(e, list) => {
          if (list) {
            navigateFromtopOneHundrendPageWithNewParams(
              "format_in",
              list[0].value,
              []
            );
          }
        }}
        handleGenreChange={(e, list) => {
          if (list) {
            navigateFromtopOneHundrendPageWithNewParams(
              "genre_in",
              list[0].name,
              []
            );
          }
        }}
      />
      <AnimeViewTypesToolBar
        isViewActive={isViewActive}
        setViewType={setActiveView}
        shouldDisplaySpreadViewOption={shouldSpreadViewbeAvailable}
        tagsList={[]}
        onTagClicked={filterQueryParamsByKeyAndValue}
        onResetTagClicked={() => {
          navigate("/anime");
        }}
        animeSortFilterProps={{
          onSortValueChange: (value) => {
            navigateToSearchPageWithNewSortQueryParams(value);
          },
          sortValue: "SCORE_DESC",
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
            itemHasRanking
          />
        )}
      {(trendingNowLoading || isLoadingMore) &&
        shouldSpreadViewbeAvailable &&
        isViewActive("SPREAD") && (
          <MainContainer>
            <TopAnimeSpreadListCover
              listCount={itemPerPage}
              hasRanking={true}
            />
          </MainContainer>
        )}
      {trendingNowData && isViewActive("SMALL_GRID") && (
        <MainAnimeList animeList={trendingNowData.Page.media} hasRanking>
          {isLoadingMore && isViewActive("SMALL_GRID") && (
            <CharacterAnimeCoverListList listCount={itemPerPage} />
          )}
        </MainAnimeList>
      )}
      {trendingNowLoading && isViewActive("SMALL_GRID") && (
        <CharacterAnimeCoverList listCount={itemPerPage} />
      )}
      {trendingNowData && isViewActive("BIG_GRID") && (
        <AnimeBigListViewMain animeList={trendingNowData.Page.media} hasRanking>
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

export default AnimeTopOneHundredMain;
