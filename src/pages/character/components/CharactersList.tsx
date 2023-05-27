import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Characters } from "../character.type";
import CharacterItem from "./CharacterItem";

interface Props {
  characters: Array<Characters>;
  isLoading: boolean;
}

export const CharactersList = ({ characters, isLoading }: Props) => {
  return (
    <Grid2 container spacing={2} sx={{ marginBottom: "2rem" }}>
      {characters.map((character) => (
        <Grid2 xs={6} sm={3} md={2} lg={2} key={character.id}>
          <CharacterItem
            id={character.id}
            isFavourite={character.isFavourite}
            image={character.image}
            name={character.name}
            isLoading={isLoading}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
