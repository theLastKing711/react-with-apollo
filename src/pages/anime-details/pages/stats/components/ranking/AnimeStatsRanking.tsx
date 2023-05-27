import { Box } from "@mui/material";
import { HighestRatingItemProps } from "../../../../components/AnimeDetailsHighestRatingItem";
import AnimeDetailsSecondaryTitle from "../../../../components/AnimeDetailsSecondaryTitle";
import AnimeStatsRankingList from "./AnimeStatsRankingList";

interface Props {
  highestRatingList: HighestRatingItemProps[];
}

const AnimeStatsRanking = ({ highestRatingList }: Props) => {
  return (
    <Box component="section">
      <AnimeDetailsSecondaryTitle>Ranking</AnimeDetailsSecondaryTitle>
      <AnimeStatsRankingList highestRatingList={highestRatingList} />
    </Box>
  );
};

export default AnimeStatsRanking;
