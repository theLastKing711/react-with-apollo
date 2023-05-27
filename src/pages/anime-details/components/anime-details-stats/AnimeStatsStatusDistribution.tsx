import { Box } from "@mui/material";
import { AnimeStatsStatusDistributionItem } from "../../anime-details.type";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import AnimeStatsStatusBadge from "./AnimeStatsStatusBadge";
import { toUpperCaseFirstChar } from "../../../../shared/shared.util";
import { AnimeStatusBadgeNameColorMap } from "../../../../shared/shared.constants";
import AnimeStatsStatusBar from "./AnimeStatsStatusBar";

interface Props {
  statusDistribution: AnimeStatsStatusDistributionItem[];
}

const AnimeStatsStatusDistribution = ({ statusDistribution }: Props) => {
  return (
    <Box sx={{ marginBottom: "2rem", overflow: "auto", minWidth: "0px" }}>
      <AnimeDetailsSecondaryTitle>
        Status Distribution
      </AnimeDetailsSecondaryTitle>
      <Box sx={{ borderRadius: "4px", overflow: "hidden" }}>
        <Box
          sx={{
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.25rem",
            backgroundColor: "white",
          }}
        >
          {statusDistribution.map((item, index) => (
            <AnimeStatsStatusBadge
              key={index}
              color={
                AnimeStatusBadgeNameColorMap[toUpperCaseFirstChar(item.status)]
                  .color
              }
              count={item.amount}
              text={toUpperCaseFirstChar(item.status)}
            />
          ))}
        </Box>
        <AnimeStatsStatusBar statusDistribution={statusDistribution} />
      </Box>
    </Box>
  );
};

export default AnimeStatsStatusDistribution;
