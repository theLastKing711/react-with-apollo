import React from "react";
import { AnimeStatScoreDistributionItem } from "../../anime-details.type";
import { Box } from "@mui/material";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import AnimeStatsStatusDistributionBarChart from "./AnimeStatsStatusDistributionBarChart";

interface Props {
  scoreDistribution: AnimeStatScoreDistributionItem[];
}

const AnimeStatsScoreDistribution = ({ scoreDistribution }: Props) => {
  return (
    <Box sx={{ minWidth: 0, marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>
        Score Distribution
      </AnimeDetailsSecondaryTitle>

      <Box>
        <AnimeStatsStatusDistributionBarChart
          scoreDistribution={scoreDistribution}
        />
      </Box>
    </Box>
  );
};

export default AnimeStatsScoreDistribution;
