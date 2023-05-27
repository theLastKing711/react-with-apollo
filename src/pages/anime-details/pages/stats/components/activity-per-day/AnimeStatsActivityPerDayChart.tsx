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

const convertTimeStampToDay = (timestamp: number) => {
  const timstampInMs = timestamp * 1000;

  const dayNumber = new Date(timstampInMs).getDate();

  console.log("day number", timstampInMs);

  if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
    return `${dayNumber}st`;
  }
  if (dayNumber === 2 || dayNumber === 22) {
    return `${dayNumber}nd`;
  }
  if (dayNumber === 3 || dayNumber === 23) {
    return `${dayNumber}rd`;
  }

  return `${dayNumber}th`;
};

const AnimeStatsActivityPerDayChart = ({ nodes }: Props) => {
  const airingTrendList =
    nodes.map((item) => ({
      ...item,
      date: convertTimeStampToDay(item.date),
    })) || [];

  console.log("airing trends list", airingTrendList);

  return (
    <Box sx={{ backgroundColor: "white", padding: "0.725rem 0" }}>
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="trending"
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

export default AnimeStatsActivityPerDayChart;
