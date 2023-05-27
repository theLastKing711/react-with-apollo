import { Grid } from "@mui/material";
import { TopAnime } from "../../../anime/anime.type";
import AnimeBigListViewItem from "./AnimeBigListViewItem";

interface Props {
  animeList: TopAnime[];
  children?: React.ReactNode;
  hasRanking?: boolean;
}

const AnimeBigListViewList = ({ animeList, hasRanking, children }: Props) => {
  return (
    <Grid container spacing={3}>
      {animeList.map((item, index) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <AnimeBigListViewItem
            animeInfo={item}
            isRanked={hasRanking}
            rank={index + 1}
          />
        </Grid>
      ))}
      {children}
    </Grid>
  );
};

export default AnimeBigListViewList;
