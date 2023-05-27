import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { AnimeStatsTrendNode } from "../../../../anime-details.type";
import { Box } from "@mui/material";

interface Props {
  nodes: AnimeStatsTrendNode[];
}

const AnimeStatsAiringWatchersProgressionChart = ({ nodes }: Props) => {
  const airingTrendList = nodes.filter((item) => item.episode !== null);

  console.log("airing trends list 3", airingTrendList);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "0.725rem 0",
        marginBottom: "2rem",
      }}
    >
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={airingTrendList}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="episode" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="popularity"
            stroke="#3db4f2"
            strokeWidth="3px"
            fill="rgba(61, 180, 242, 0.4)"
            activeDot
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnimeStatsAiringWatchersProgressionChart;
