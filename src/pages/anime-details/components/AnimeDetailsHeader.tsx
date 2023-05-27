import { Alert, Box, IconButton, Snackbar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MainContainer from "../../../shared/components/MainContainer";
import { Link } from "react-router-dom";
import { ActiveTab, HeaderTabItem } from "../AnimeDetailsMain";
import { ANIME_STATUS_TEXT_MAP } from "../../../shared/shared.constants";
import { useState } from "react";

export interface Props {
  englishTitle: string;
  description: string;
  coverImageUrl: string;
  activeTab: string;
  setActiveTab: (url: string) => void;
  isFavourite: boolean;
  onAnimeFavouriteToggle: (cb: () => void) => void;
  isFavouriteSnackBarOpen: boolean;
  onFavouriteSnackBarClosed: () => void;
  tabs: HeaderTabItem[];
  onAddToListClicked: () => void;
  MediaListStatus: string | null;
  setSuccessMessageSnackBar: (message: string) => void;
  openSuccessMessageSnackBar: () => void;
}

const DESCRIPTION_READ_MORE_CHARACTERS = 728;

const AnimeDetailsHeader = ({
  englishTitle,
  description,
  coverImageUrl,
  isFavourite,
  onAnimeFavouriteToggle,
  activeTab,
  setActiveTab,
  isFavouriteSnackBarOpen,
  onFavouriteSnackBarClosed,
  tabs,
  onAddToListClicked,
  MediaListStatus,
  setSuccessMessageSnackBar,
  openSuccessMessageSnackBar,
}: Props) => {
  const [isDescriptionReadMoreActive, setisDescriptionReadMoreActive] =
    useState(false);

  const getIsFavouriteSnackbarMessage = () => {
    const message = `${isFavourite ? "Removed from " : " Added to "}favourites`;

    return message;
  };

  const isTabActive = (tab: ActiveTab) => {
    return activeTab === tab;
  };

  const getAddToListMessage = () => {
    return (
      (MediaListStatus && ANIME_STATUS_TEXT_MAP[MediaListStatus]) ||
      "Add to list"
    );
  };

  const shouldShowReadMoreForDescription = () => {
    const isDescriptonGreaterThanMaxLength =
      description.length >= DESCRIPTION_READ_MORE_CHARACTERS;

    return !isDescriptionReadMoreActive && isDescriptonGreaterThanMaxLength;
  };

  const getDescriptionCutText = () => {
    return description.substring(0, DESCRIPTION_READ_MORE_CHARACTERS) + "...";
  };

  return (
    <Box component="header">
      <MainContainer>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: "1.5rem",
            "@media screen and (max-width: 800px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Box
            sx={{
              "@media screen and (max-width: 800px)": {
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "1rem",
              },
            }}
          >
            <Box
              component="img"
              src={coverImageUrl}
              sx={{
                position: "relative",
                borderRadius: "4px",
                marginTop: "-125px",
                "@media screen and (max-width: 800px)": {
                  marginTop: "-94px",
                },
              }}
            ></Box>
            <Box sx={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
              <Box sx={{ flex: 1 }}>
                <Box
                  component="button"
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    backgroundColor: "rgb(60, 181, 282)",
                    color: "white",
                    fontSize: "0.875rem",
                    borderRadius: "4px",
                    border: "none",
                    height: "100%",
                    //   padding: "0.25rem 1.5rem 1.25rem",
                  }}
                  onClick={onAddToListClicked}
                >
                  {getAddToListMessage()}
                </Box>
              </Box>
              <Box>
                <IconButton
                  sx={{
                    backgroundColor: "rgb(236, 41, 75)",
                    borderRadius: "4px",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                  }}
                  onClick={() =>
                    onAnimeFavouriteToggle(() => {
                      openSuccessMessageSnackBar();
                      setSuccessMessageSnackBar(
                        getIsFavouriteSnackbarMessage()
                      );
                    })
                  }
                  disableRipple
                >
                  <FavoriteIcon
                    sx={{
                      fill: isFavourite ? "rgb(255, 174, 188)" : "white",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "inline-grid",
              gridTemplateRows: "min-content min-content auto",
              paddingTop: "1rem",
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: "1.1875rem",
                fontWeight: 400,
                color: "rgb(92, 114, 138)",
              }}
            >
              {englishTitle}
            </Typography>
            <Box
              sx={{
                maxWidth: "900px",
                position: "relative",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgb(122, 133, 143)",
                  padding: "1rem 0",
                }}
                dangerouslySetInnerHTML={{
                  __html: shouldShowReadMoreForDescription()
                    ? getDescriptionCutText()
                    : description,
                }}
              ></Typography>
              {shouldShowReadMoreForDescription() && (
                <Box
                  sx={{
                    content: "''",
                    position: "absolute",
                    width: "100%",
                    backgroundImage:
                      "linear-gradient(180deg,transparent 20%, white)",
                    textAlign: "center",
                    color: "rgb(146, 153, 161)",
                    bottom: 0,
                    padding: "2rem 0 1rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                  onClick={() => setisDescriptionReadMoreActive(true)}
                >
                  Read More
                </Box>
              )}
            </Box>
            <Box
              component="nav"
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",

                overflow: "auto",
              }}
            >
              <Box
                component="ul"
                sx={{ display: "flex", gap: "2rem", minWidth: "0px" }}
              >
                {tabs.map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      transition: "color 0.2s",
                      color: `${
                        isTabActive(item.label) ? "black" : "rgb(92, 114, 138)"
                      }`,
                      "&:hover": {
                        color: "rgb(61, 180, 242)",
                      },
                    }}
                  >
                    <Link
                      to={item.url}
                      style={{
                        padding: "0.875rem",
                        display: "inline-block",
                        fontSize: "0.8125rem",
                        // "&:hover": {
                        //   color: "rgb(68, 166, 219)",
                        // },
                      }}
                      onClick={() => setActiveTab(item.url)}
                    >
                      {item.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </MainContainer>
    </Box>
  );
};

export default AnimeDetailsHeader;
