import { Box } from "@mui/material";
import React from "react";
import AnimeDetailsWatchList from "../../components/anime-details-watch/AnimeDetailsWatchList";
import { useGetAnimeStreamingEpisodes } from "../../hooks/useGetAnimeStreamingEpisodes";
import { useLocation } from "react-router-dom";

const AnimeDetailsWatchMain = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading } = useGetAnimeStreamingEpisodes({ id: parseInt(id) });

  const watchList = data?.Media.streamingEpisodes || [];

  return (
    <Box>
      <AnimeDetailsWatchList animeWatchList={watchList} />
    </Box>
  );
};

export default AnimeDetailsWatchMain;
