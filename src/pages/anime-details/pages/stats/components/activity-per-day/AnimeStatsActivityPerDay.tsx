import { Box } from "@mui/material";
import React from "react";
import AnimeDetailsSecondaryTitle from "../../../../components/AnimeDetailsSecondaryTitle";
import { AnimeStatsTrendNode } from "../../../../anime-details.type";
import AnimeStatsActivityPerDayChart from "./AnimeStatsActivityPerDayChart";

interface Props {
  nodes: AnimeStatsTrendNode[];
}

const AnimeStatsActivityPerDay = ({ nodes }: Props) => {
  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>
        Airing Score Progression
      </AnimeDetailsSecondaryTitle>
      <AnimeStatsActivityPerDayChart nodes={nodes} />
    </Box>
  );
};

export default AnimeStatsActivityPerDay;
