import { Box, Tooltip } from "@mui/material";
import { AnimeStatsStatusDistributionItem } from "../../anime-details.type";
import { toUpperCaseFirstChar } from "../../../../shared/shared.util";
import { AnimeStatusBadgeNameColorMap } from "../../../../shared/shared.constants";

interface Props {
  statusDistribution: AnimeStatsStatusDistributionItem[];
}

const AnimeStatsStatusBar = ({ statusDistribution }: Props) => {
  const totalStatesAmount = statusDistribution.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  return (
    <Box sx={{ display: "flex", height: "0.875rem" }}>
      {statusDistribution.map((item, index) => {
        const currentItemPercent = (item.amount * 100) / totalStatesAmount;

        const itemStatusToUpperFirst = toUpperCaseFirstChar(item.status);

        const currentItemColor =
          AnimeStatusBadgeNameColorMap[itemStatusToUpperFirst].color;

        return (
          <Tooltip title={itemStatusToUpperFirst} arrow key={index}>
            <Box
              sx={{
                flex: `0 0 ${currentItemPercent}%`,
                backgroundColor: currentItemColor,
              }}
            ></Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default AnimeStatsStatusBar;
