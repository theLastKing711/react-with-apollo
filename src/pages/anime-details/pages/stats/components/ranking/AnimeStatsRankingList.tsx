import { Box, Grid } from "@mui/material";
import AnimeDetailsHighestRatingItem, {
  HighestRatingItemProps,
} from "../../../../components/AnimeDetailsHighestRatingItem";

interface Props {
  highestRatingList: HighestRatingItemProps[];
}

const AnimeStatsRankingList = ({ highestRatingList }: Props) => {
  console.log("highestRatingList", highestRatingList);

  return (
    <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
      {highestRatingList.map((item, index) => {
        return (
          <Grid item lg={4} md={6} xs={12} key={index}>
            <AnimeDetailsHighestRatingItem
              rankingItem={item.rankingItem}
              startIcon={item.startIcon}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AnimeStatsRankingList;
