import { Box } from "@mui/material";
import React from "react";
import { useGetAnimeStats } from "../../hooks/useGetAnimeStats";
import {
  AnimeDetailsRankings,
  HighestRatingItemProps,
} from "../../components/AnimeDetailsHighestRatingItem";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AnimeStatsRanking from "./components/ranking/AnimeStatsRanking";
import AnimeStatsActivityPerDay from "./components/activity-per-day/AnimeStatsActivityPerDay";
import AnimeStatsAiringScoreProgression from "./components/airing-score-progression/AnimeStatsAiringScoreProgression";
import AnimeStatsAiringWatchersProgressionChart from "./components/airing-watchers-progression/AnimeStatsAiringWatchersProgressionChart";
import AnimeStatsScoreDistribution from "../../components/anime-details-stats/AnimeStatsScoreDistribution";
import AnimeStatsStatusDistribution from "../../components/anime-details-stats/AnimeStatsStatusDistribution";
import AnimeStatsAiringWatchersProgression from "./components/airing-watchers-progression/AnimeStatsAiringWatchersProgression";
import { useLocation } from "react-router-dom";

const getRankingIconFromContext = (item: AnimeDetailsRankings) => {
  if (item.context === "highest rated") {
    return (
      <StarIcon
        sx={{
          fill: "rgb(247, 191, 99)",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      />
    );
  }

  return (
    <FavoriteIcon
      sx={{
        fill: "rgb(232, 93, 117)",
        fontSize: "0.875rem",
        fontWeight: 500,
      }}
    />
  );
};

const AnimeDetailsStatsMain = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading } = useGetAnimeStats({ id: parseInt(id) });

  const filterdRatings =
    data?.Media.rankings.map<HighestRatingItemProps>((item) => ({
      rankingItem: { ...item },
      startIcon: getRankingIconFromContext(item),
    })) || [];

  const trindList = (data && [...data.Media.trends.nodes].reverse()) || [];

  const airingTrendList =
    (data && [...data.Media.airingTrend.nodes].reverse()) || [];

  const statusDsitribution = data?.Media.stats.statusDistribution || [];

  const scoreDistribution = data?.Media.stats.scoreDistribution || [];

  return (
    <Box sx={{ minWidth: "0px" }}>
      {data && <AnimeStatsRanking highestRatingList={filterdRatings} />}
      {data && <AnimeStatsActivityPerDay nodes={trindList} />}
      {data && <AnimeStatsAiringScoreProgression nodes={airingTrendList} />}
      {data && <AnimeStatsAiringWatchersProgression nodes={airingTrendList} />}
      {data && (
        <AnimeStatsStatusDistribution statusDistribution={statusDsitribution} />
      )}
      {data && (
        <AnimeStatsScoreDistribution scoreDistribution={scoreDistribution} />
      )}
    </Box>
  );
};

export default AnimeDetailsStatsMain;
