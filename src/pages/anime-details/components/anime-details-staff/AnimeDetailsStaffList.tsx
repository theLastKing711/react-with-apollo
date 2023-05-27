import { Grid } from "@mui/material";
import { AnimeStaffEdges } from "../../anime-details.type";
import AnimeDetailsStaffItem from "./AnimeDetailsStaffItem";

interface Props extends AnimeStaffEdges {}

const AnimeDetailsStaffList = ({ edges }: Props) => {
  return (
    <Grid container spacing={2}>
      {edges.map((edge, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <AnimeDetailsStaffItem staffDetails={edge} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimeDetailsStaffList;
