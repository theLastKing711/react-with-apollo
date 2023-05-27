import { Box, Grid } from "@mui/material";
import MainContainer from "../../../../shared/components/MainContainer";
import AnimeBigListViewCoverItem from "./AnimeBigListViewCoverItem";
import AnimeBigListViewCoverList from "./AnimeBigListViewCoverList";

interface Props {
  listLength?: number;
}

const AnimeBigListViewCoverMain = ({ listLength = 20 }: Props) => {
  return (
    <Box sx={{ padding: "1.5rem 0" }}>
      <MainContainer>
        <Grid container spacing={3}>
          <AnimeBigListViewCoverList listCount={listLength} />
        </Grid>
      </MainContainer>
    </Box>
  );
};

export default AnimeBigListViewCoverMain;
