import { Box } from "@mui/material";
import { AnimeRecommendationsNodes } from "../../anime-details.type";
import AnimeDetailsRecommendationItem from "./AnimeDetailsRecommendationItem";
import { useState } from "react";
import { useTransition } from "@react-spring/web";

interface Props extends AnimeRecommendationsNodes {
  recommendAnime: (id: number) => void;
  discommendAnime: (id: number) => void;
  removeAnimeRecommendation: (id: number) => void;
}

const AnimeDetailsRecommendationList = ({
  nodes,
  discommendAnime,
  recommendAnime,
  removeAnimeRecommendation,
}: Props) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  const [transitions, api] = useTransition(isImageHovered, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  }));

  return transitions((style, item) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 130px)",
        gap: "1rem",
      }}
    >
      {nodes.map((item, index) => (
        <AnimeDetailsRecommendationItem
          recommendation={item}
          key={item.mediaRecommendation.id}
          recommendAnime={recommendAnime}
          discommendAnime={discommendAnime}
          removeAnimeRecommendation={removeAnimeRecommendation}
        />
      ))}
    </Box>
  ));
};

export default AnimeDetailsRecommendationList;
