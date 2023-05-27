import { Box } from "@mui/material";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import { AnimeRecommendationsNodes } from "../../anime-details.type";
import AnimeDetailsRecommendationList from "./AnimeDetailsRecommendationList";

interface Props extends AnimeRecommendationsNodes {
  recommendAnime: (id: number) => void;
  discommendAnime: (id: number) => void;
  removeAnimeRecommendation: (id: number) => void;
}

const AnimeDetailsRecommendation = ({
  nodes,
  discommendAnime,
  recommendAnime,
  removeAnimeRecommendation,
}: Props) => {
  return (
    <Box component="section">
      <AnimeDetailsSecondaryTitle>Recommendations</AnimeDetailsSecondaryTitle>
      <AnimeDetailsRecommendationList
        nodes={nodes}
        recommendAnime={recommendAnime}
        discommendAnime={discommendAnime}
        removeAnimeRecommendation={removeAnimeRecommendation}
      />
    </Box>
  );
};

export default AnimeDetailsRecommendation;
