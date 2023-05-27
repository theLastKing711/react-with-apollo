import React from "react";
import { AnimeTrailer } from "../../anime-details.type";
import { Box } from "@mui/material";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";

interface Props {
  trailerInfo: AnimeTrailer;
}

const AnimeStatsTrailer = ({ trailerInfo }: Props) => {
  const AnimeYoutubeUrl = `https://www.${trailerInfo.site}.com/embed/${trailerInfo.id}`;

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>Trailer</AnimeDetailsSecondaryTitle>
      <Box
        component="iframe"
        sx={{
          width: "50%",
          height: "230px",
          "@media screen and (max-width: 800px)": {
            width: "100%",
          },
        }}
        src={AnimeYoutubeUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Embedded youtube"
        allowFullScreen
        frameBorder="0"
      />
    </Box>
  );
};

export default AnimeStatsTrailer;
