import { Grid } from "@mui/material";
import { AnimeDetailsOverviewCharacterEdges } from "../../anime-details.type";
import AnimeDetailsCharactersItem from "./AnimeDetailsCharactersItem";

interface Props extends AnimeDetailsOverviewCharacterEdges {}

const AnimeDetailsCharactersList = ({ edges }: Props) => {
  console.log("edges", edges);

  return (
    <Grid container spacing={2}>
      {edges.map((node, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <AnimeDetailsCharactersItem character={node} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimeDetailsCharactersList;
