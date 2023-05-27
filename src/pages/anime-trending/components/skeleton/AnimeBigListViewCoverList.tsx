import { Grid } from "@mui/material";
import AnimeBigListViewCoverItem from "./AnimeBigListViewCoverItem";

interface Props {
  listCount?: number;
}

const AnimeBigListViewCoverList = ({ listCount = 20 }: Props) => {
  const placeHolderList = Array.from({ length: 20 }, (_, i) => {
    return i;
  });

  return (
    <>
      {placeHolderList.map((item, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <AnimeBigListViewCoverItem />
        </Grid>
      ))}
    </>
  );
};

export default AnimeBigListViewCoverList;
