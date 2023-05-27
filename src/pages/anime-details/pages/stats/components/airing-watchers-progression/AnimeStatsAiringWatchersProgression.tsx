import { Box } from "@mui/material";
import React from "react";
import AnimeDetailsSecondaryTitle from "../../../../components/AnimeDetailsSecondaryTitle";
import { AnimeStatsTrendNode } from "../../../../anime-details.type";
import AnimeStatsAiringWatchersProgressionChart from "./AnimeStatsAiringWatchersProgressionChart";

interface Props {
  nodes: AnimeStatsTrendNode[];
}

const AnimeStatsAiringWatchersProgression = ({ nodes }: Props) => {
  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>
        Airing Watchers Progression
      </AnimeDetailsSecondaryTitle>
      <AnimeStatsAiringWatchersProgressionChart nodes={nodes} />
    </Box>
  );
};

export default AnimeStatsAiringWatchersProgression;
