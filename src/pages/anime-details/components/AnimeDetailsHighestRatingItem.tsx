import { Box } from "@mui/material";
import { MediaSeason } from "../anime-details.type";
import { toUpperCaseFirstChar } from "../../../shared/shared.util";

export interface AnimeDetailsRankings {
  allTime: boolean;
  context: string;
  rank: number;
  season: MediaSeason;
  year: number;
}

export interface HighestRatingItemProps {
  rankingItem: AnimeDetailsRankings;
  startIcon: JSX.Element;
}

const AnimeDetailsHighestRatingItem = ({
  rankingItem,
  startIcon,
}: HighestRatingItemProps) => {
  const buildHighestRatingString = (item: AnimeDetailsRankings) => {
    const highestRatingDate = isAllTimeHighestRated(item)
      ? "All Time"
      : item.year;

    const mainKeyWorkd = getRankingMainKeyWord(item);

    const season = ` ${toUpperCaseFirstChar(item.season)} ` || "";

    return `#${item.rank} ${mainKeyWorkd}${season} ${highestRatingDate}`;
  };

  const getRankingMainKeyWord = (item: AnimeDetailsRankings) => {
    if (item.context === "highest rated") {
      return "Highest";
    }
    return "Most Popular";
  };

  const isAllTimeHighestRated = (item: AnimeDetailsRankings) => {
    return item.allTime;
  };

  return (
    <Box
      sx={{
        padding: "0.5rem",
        display: "flex",
        backgroundColor: "white",
        borderRadius: "2px",
      }}
    >
      {startIcon}
      <Box
        sx={{
          fontSize: "0.75rem",
          flex: 1,
          textAlign: "center",
          color: "rgb(61, 180, 242)",
        }}
      >
        {buildHighestRatingString(rankingItem)}
      </Box>
    </Box>
  );
};

export default AnimeDetailsHighestRatingItem;
