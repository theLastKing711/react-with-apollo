import { Box } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AnimeStatScoreDistributionItem } from "../../anime-details.type";
import { BarChartItem } from "../../../../shared/shared.type";
import { useLayoutEffect, useRef, useState } from "react";
import { useResize } from "../../../../shared/hook/useResize";

const barChartColor = [
  "hsl(10, 65%, 50%)",
  "hsl(20, 65%, 50%)",
  "hsl(30, 65%, 50%)",
  "hsl(40, 65%, 50%)",
  "hsl(50, 65%, 50%)",
  "hsl(60, 65%, 50%)",
  "hsl(70, 65%, 50%)",
  "hsl(80, 65%, 50%)",
  "hsl(90, 65%, 50%)",
  "hsl(100, 65%, 50%)",
];

interface Props {
  scoreDistribution: AnimeStatScoreDistributionItem[];
}

const AnimeStatsStatusDistributionBarChart = ({ scoreDistribution }: Props) => {
  const barChartData: BarChartItem[] = scoreDistribution.map<BarChartItem>(
    (item, index) => ({
      name: item.score.toString(),
      amount: item.amount,
      fill: barChartColor[index],
    })
  );

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "6px" }}>
      <ResponsiveContainer width="100%" height={103}>
        <BarChart width={150} height={80} data={barChartData}>
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Tooltip />
          <Bar dataKey="amount">
            {barChartData.map((entry, index) => (
              <Cell cursor="pointer" fill={entry.fill} key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnimeStatsStatusDistributionBarChart;
