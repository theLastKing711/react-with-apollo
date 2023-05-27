import React, { useState } from "react";
import { useGetAnimeDetails } from "./hooks/useGetAnimeDetails";
import { Alert, Box, Snackbar } from "@mui/material";
import MainContainer from "../../shared/components/MainContainer";
import AnimeDetailsBannerImage from "./components/AnimeDetailsBannerImage";
import AnimeDetailsHeader from "./components/AnimeDetailsHeader";
import AnimeDetailsHighestRatingList from "./components/AnimeDetailsHighestRatingList";
import AnimeDetailsGeneralInfo from "./components/AnimeDetailsGeneralInfo";
import AnimeDetailsTagsList from "./components/AnimeDetailsTagsList";
import StarIcon from "@mui/icons-material/Star";
import { useResize } from "../../shared/hook/useResize";
import { usePostAnimeToggleFavourite } from "./hooks/usePostAnimeToggleFavourite";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { HighestRatingItemProps } from "./components/AnimeDetailsHighestRatingItem";
import AnimeDetailsAddToListDialog from "./components/anime-details-add-to-list-dialog/AnimeDetailsAddToListDialog";

export type ActiveTab = "Overview" | "Watch" | "Characters" | "Staff" | "Stats";

const URL_TO_TAB_NAME_MAP: Record<string, ActiveTab> = {
  stats: "Stats",
  watch: "Watch",
  characters: "Characters",
  staff: "Staff",
};

const getUrlToTabName = (url: string) => {
  return URL_TO_TAB_NAME_MAP[url] || "Overview";
};

export type HeaderTabItem = {
  label: ActiveTab;
  url: string;
};

const HeaderTabs: HeaderTabItem[] = [
  {
    label: "Overview",
    url: "",
  },
  {
    label: "Watch",
    url: "watch",
  },
  {
    label: "Characters",
    url: "characters",
  },
  {
    label: "Staff",
    url: "staff",
  },
  {
    label: "Stats",
    url: "stats",
  },
];

const RankingStarIcon = (
  <StarIcon
    sx={{
      fill: "rgb(247, 191, 99)",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "rgb(61, 180, 242)",
    }}
  />
);

const AnimeDetailsMain = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const currentPagePath = location.pathname.split("/")[3] || "";

  const id = location.pathname.split("/")[2];

  const activeTab = getUrlToTabName(currentPagePath);

  const [isSuccessMessageSnackBarOpen, setisSuccessMessageSnackBarOpen] =
    useState(false);

  const [successSnackbarMessage, setSucccessSnackBarMessage] = useState("");

  const [isAddToListDialogOpen, setisAddToListDialogOpen] = useState(false);

  const screenWidth = useResize();

  const isSmallScreen = screenWidth <= 800;

  const { data, loading } = useGetAnimeDetails({ id: parseInt(id) });

  console.log("anime data", data);

  console.log("anime details", data?.Media.mediaListEntry);

  const openSuccessMessageSnackBar = () => {
    setisSuccessMessageSnackBarOpen(true);
  };

  const closeSuccessMessageSnackbar = () => {
    setisSuccessMessageSnackBarOpen(false);
  };

  const { toggleAnimeFavourite } = usePostAnimeToggleFavourite(
    parseInt(id),
    () => {}
  );

  const filterdRatings =
    data?.Media.rankings
      .filter((item) => item.allTime || (item.rank === 1 && item.year))
      .map<HighestRatingItemProps>((item) => ({
        rankingItem: { ...item },
        startIcon: RankingStarIcon,
      })) || [];

  // const sortedStatusDistribution =
  //   overviewData?.Media.stats.statusDistribution.sort((a, b) => {
  //     console.log("asdf", a);
  //     console.log("asdf", b);

  //     const isLarger =
  //       AnimeStatusBadgeNameColorMap[toUpperCaseFirstChar(a.status)].order -
  //         AnimeStatusBadgeNameColorMap[toUpperCaseFirstChar(b.status)].order <
  //       0
  //         ? 1
  //         : -1;
  //     console.log("is Larger", isLarger);
  //     return isLarger;
  //   });

  const openAddListDialog = () => {
    setisAddToListDialogOpen(true);
  };

  const closeAddListDialog = () => {
    setisAddToListDialogOpen(false);
  };

  const mediaListnetryId = () => {
    if (data && data?.Media.mediaListEntry) {
      return data.Media.mediaListEntry.id;
    }

    return -1;
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={closeSuccessMessageSnackbar}
        open={isSuccessMessageSnackBarOpen}
        autoHideDuration={3000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successSnackbarMessage}
        </Alert>
      </Snackbar>

      {data && isAddToListDialogOpen && (
        <AnimeDetailsAddToListDialog
          id={mediaListnetryId()}
          mediaId={parseInt(id)}
          animeInfo={{
            coverImage: data.Media.coverImage.large,
            title: data.Media.title.english,
            bannerImage: data.Media.bannerImage,
            isFavourite: data.Media.isFavourite,
            episodes: data.Media.episodes,
          }}
          handleAnimeFavourite={(cb: () => void) =>
            toggleAnimeFavourite(parseInt(id), cb)
          }
          handleAnimeSave={() => {}}
          isOpen={isAddToListDialogOpen}
          handleClose={closeAddListDialog}
          mediaListEntry={data.Media.mediaListEntry}
          isSuccessMessageSnackBarOpen={isSuccessMessageSnackBarOpen}
          openSuccessMessageSnackBar={openSuccessMessageSnackBar}
          closeSuccessMessageSnackBar={closeSuccessMessageSnackbar}
          setSuccessMessageSnackBar={setSucccessSnackBarMessage}
        />
      )}
      <Box sx={{ backgroundColor: "white" }}>
        <AnimeDetailsBannerImage imageUrl={data?.Media.bannerImage || ""} />
        <AnimeDetailsHeader
          isFavourite={data?.Media.isFavourite || false}
          coverImageUrl={data?.Media.coverImage.large || ""}
          description={data?.Media.description || ""}
          englishTitle={data?.Media.title.english || ""}
          activeTab={activeTab}
          setActiveTab={(tab) => navigate(tab)}
          onAnimeFavouriteToggle={(cb: () => void) =>
            toggleAnimeFavourite(parseInt(id), cb)
          }
          openSuccessMessageSnackBar={openSuccessMessageSnackBar}
          isFavouriteSnackBarOpen={isSuccessMessageSnackBarOpen}
          onFavouriteSnackBarClosed={closeSuccessMessageSnackbar}
          setSuccessMessageSnackBar={setSucccessSnackBarMessage}
          tabs={HeaderTabs}
          onAddToListClicked={openAddListDialog}
          MediaListStatus={data?.Media.mediaListEntry?.status || null}
        />
      </Box>

      <Box sx={{ padding: "2rem 0", backgroundColor: "#EDF1F5" }}>
        <MainContainer>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "232px 1fr",
              gap: "1.5rem",
              "@media screen and (max-width: 800px)": {
                gridTemplateColumns: "1fr",
              },
            }}
          >
            <Box sx={{ minWidth: "0px" }}>
              {!isSmallScreen && (
                <AnimeDetailsHighestRatingList
                  highestRatingList={filterdRatings}
                />
              )}
              {data && (
                <AnimeDetailsGeneralInfo
                  animeInfo={{
                    format: data.Media.format,
                    duration: data.Media.duration,
                    status: data.Media.status,
                    startDate: data.Media.startDate,
                    endDate: data.Media.endDate,
                    episodes: data.Media.episodes,
                    favourites: data.Media.favourites,
                    genres: data.Media.genres,
                    popularity: data.Media.popularity,
                    season: data.Media.season,
                    studios: data.Media.studios.nodes[0].name,
                    synonyms: data.Media.synonyms,
                    title: data.Media.title,
                    seasonYear: data.Media.seasonYear,
                    averageScore: data.Media.averageScore,
                    meanScore: data.Media.meanScore,
                    source: data.Media.source,
                    hashtag: data.Media.hashtag,
                  }}
                />
              )}
              {data && <AnimeDetailsTagsList tags={data.Media.tags} />}
            </Box>
            <Box component="main">
              <Outlet />
            </Box>
          </Box>
        </MainContainer>
      </Box>
    </Box>
  );
};

export default AnimeDetailsMain;
