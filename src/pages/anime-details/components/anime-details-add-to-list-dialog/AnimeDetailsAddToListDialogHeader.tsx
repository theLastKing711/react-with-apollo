import { Box, IconButton, Button } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  animeInfo: {
    coverImage: string;
    title: string;
    bannerImage: string;
    isFavourite: boolean;
    episodes: number;
  };
  handleAnimeFavourite: (cb: () => void) => void;
  handleAnimeSave: () => void;
  handleClose: () => void;
  openSuccessMessageSnackBar: () => void;
  setSuccessMessageSnackBar: (message: string) => void;
}

const AnimeDetailsAddToListDialogHeader = ({
  animeInfo,
  handleAnimeFavourite,
  handleAnimeSave,
  handleClose,
  openSuccessMessageSnackBar,
  setSuccessMessageSnackBar,
}: Props) => {
  const getIsFavouriteSnackbarMessage = () => {
    const message = `${
      animeInfo.isFavourite ? "Removed from " : " Added to "
    }favourites`;

    return message;
  };

  return (
    <Box
      component="header"
      sx={{
        borderRadius: "4px",
        backgroundColor: "#FAFAFA",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
        }}
        disableRipple
      >
        <CloseIcon
          sx={{
            fill: "white",
          }}
        />
      </IconButton>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${animeInfo.bannerImage})`,
          height: "200px",
          backgroundSize: "cover, cover",
          padding: "0 3rem 1.5rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "flex-end",
          "@media screen and (max-width: 800px)": {
            padding: "0 1.5rem 1.5rem",
            gap: "0.5rem",
          },
        }}
      >
        <Box
          component="img"
          src={animeInfo.coverImage}
          sx={{
            width: "100px",
            marginBottom: "-55px",
            borderRadius: "2px",
          }}
        />
        <Box
          component="h2"
          sx={{
            flex: 1,
            color: "white",
            fontSize: "1rem",
            padding: "0.5rem",
          }}
        >
          {animeInfo.title}
        </Box>
        <IconButton
          sx={{
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontWeight: 800,
            fontSize: "0.875rem",
          }}
          onClick={() =>
            handleAnimeFavourite(() => {
              openSuccessMessageSnackBar();
              setSuccessMessageSnackBar(getIsFavouriteSnackbarMessage());
            })
          }
          disableRipple
        >
          <FavoriteIcon
            sx={{
              fill: animeInfo.isFavourite ? "rgb(232, 93, 117)" : "white",
              fontSize: "1.1rem",
            }}
          />
        </IconButton>
        <Button
          sx={{
            backgroundColor: "rgb(61, 180, 242)",
            fontSize: "0.8125rem",
            color: "white",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "rgb(61, 180, 242)",
            },
          }}
          onClick={handleAnimeSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AnimeDetailsAddToListDialogHeader;
