import { Box } from "@mui/material";
import {
  AnimeStatScoreDistributionItem,
  AnimeStatsStatusDistributionItem,
} from "../../anime-details.type";
import AnimeStatsScoreDistribution from "./AnimeStatsScoreDistribution";
import AnimeStatsStatusDistribution from "./AnimeStatsStatusDistribution";

interface Props {
  scoreDistribution: AnimeStatScoreDistributionItem[];
  statusDistribution: AnimeStatsStatusDistributionItem[];
}

const AnimeDetailOverviewStats = ({
  scoreDistribution,
  statusDistribution,
}: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "2rem",
        "@media screen and (max-width: 1300px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      <AnimeStatsStatusDistribution statusDistribution={statusDistribution} />
      <AnimeStatsScoreDistribution scoreDistribution={scoreDistribution} />
    </Box>
  );
};

export default AnimeDetailOverviewStats;
