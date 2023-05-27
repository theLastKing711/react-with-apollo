import { Box } from "@mui/material";
import React from "react";
import AnimeDetailsSecondaryTitle from "../../../../components/AnimeDetailsSecondaryTitle";
import { AnimeStatsTrendNode } from "../../../../anime-details.type";
import AnimeStatsAiringScoreProgressionChart from "./AnimeStatsAiringScoreProgressionChart";

interface Props {
  nodes: AnimeStatsTrendNode[];
}

const AnimeStatsAiringScoreProgression = ({ nodes }: Props) => {
  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>
        Airing Score Progression
      </AnimeDetailsSecondaryTitle>
      <AnimeStatsAiringScoreProgressionChart nodes={nodes} />
    </Box>
  );
};

export default AnimeStatsAiringScoreProgression;
