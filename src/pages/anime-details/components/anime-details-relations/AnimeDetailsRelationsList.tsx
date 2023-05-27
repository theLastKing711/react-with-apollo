import { Grid } from "@mui/material";
import { AnimeDetailsRelationsNodes } from "../../anime-details.type";
import AnimeDetailsRelationsItem from "./AnimeDetailsRelationsItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface Props extends AnimeDetailsRelationsNodes {}

const AnimeDetailsRelationsList = ({ nodes }: Props) => {
  return (
    <Grid container spacing={2}>
      {nodes.map((node, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <AnimeDetailsRelationsItem animeRelationItem={node} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimeDetailsRelationsList;
