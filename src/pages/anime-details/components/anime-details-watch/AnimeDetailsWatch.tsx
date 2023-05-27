import { Box } from "@mui/material";
import { AnimeStreamingEpisodes } from "../../anime-details.type";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import AnimeDetailsWatchList from "./AnimeDetailsWatchList";

interface Props {
  animeWatchList: AnimeStreamingEpisodes[];
}

const AnimeDetailsWatch = ({ animeWatchList }: Props) => {
  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>Watch</AnimeDetailsSecondaryTitle>
      <AnimeDetailsWatchList animeWatchList={animeWatchList} />
    </Box>
  );
};

export default AnimeDetailsWatch;
