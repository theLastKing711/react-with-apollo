import { Box } from "@mui/material";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import { AnimeDetailsOverviewCharacterEdges } from "../../anime-details.type";
import AnimeDetailsCharactersList from "./AnimeDetailsCharactersList";

interface Props extends AnimeDetailsOverviewCharacterEdges {}

const AnimeDetailsCharactersSection = ({ edges }: Props) => {
  console.log("props", edges);

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>Characters</AnimeDetailsSecondaryTitle>
      <AnimeDetailsCharactersList edges={edges} />
    </Box>
  );
};

export default AnimeDetailsCharactersSection;
