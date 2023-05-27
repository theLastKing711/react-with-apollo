import { Box, IconButton } from "@mui/material";
import { AnimeRecommendationsNode } from "../../anime-details.type";
import { Link } from "react-router-dom";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { animated } from "@react-spring/web";

const animeMainRoute = "/anime";

interface Props {
  recommendation: AnimeRecommendationsNode;
  recommendAnime: (id: number) => void;
  discommendAnime: (id: number) => void;
  removeAnimeRecommendation: (id: number) => void;
}

const AnimatedBox = animated(Box);

const AnimeDetailsRecommendationItem = ({
  recommendation,
  recommendAnime,
  discommendAnime,
  removeAnimeRecommendation,
}: Props) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  // const [transitions, api] = useTransition([1, 2], () => ({
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 1 },
  // }))

  const {
    rating,
    userRating,
    mediaRecommendation: {
      title: { english: englishTitle },
      coverImage: { large },
      id,
    },
  } = recommendation;

  const animeRoute = `${animeMainRoute}/${id}`;

  const isAnimeRecomended = userRating === "RATE_UP";

  const isAnimeDiscomended = userRating === "RATE_DOWN";

  const toggleRecommendAnime = () => {
    if (isAnimeRecomended) {
      removeAnimeRecommendation(id);
    } else {
      recommendAnime(id);
    }
  };

  const toggleDiscommendAnime = () => {
    if (isAnimeDiscomended) {
      removeAnimeRecommendation(id);
    } else {
      discommendAnime(id);
    }
  };

  return (
    <Box component="article">
      <Box
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        style={{
          display: "grid",
          gridTemplateRows: "1fr auto",
          position: "relative",
          backgroundImage: `url(${large})`,
          height: "180px",
          backgroundSize: "cover",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <Link to={animeRoute} />
        {isImageHovered && (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0.75rem",
              margin: "0.375rem",
              backgroundColor: "rgba(31, 38, 49, 0.8)",
              borderRadius: "5px",
              backgroundBlendMode: "blur",
            }}
          >
            <Box>
              <IconButton
                disableRipple
                sx={{ padding: 0, marginRight: "0.625rem" }}
                onClick={toggleRecommendAnime}
              >
                <ThumbUpIcon
                  fontSize="small"
                  sx={{
                    transition: "fill 0.2s",
                    fill: `${
                      isAnimeRecomended
                        ? "rgb(123, 213, 85)"
                        : "rgba(255, 255, 255, 0.8)"
                    }`,
                    "&:hover": {
                      fill: "rgb(123, 213, 85)",
                    },
                  }}
                />
              </IconButton>
              <IconButton
                disableRipple
                sx={{ padding: 0 }}
                onClick={toggleDiscommendAnime}
              >
                <ThumbDownAltIcon
                  fontSize="small"
                  sx={{
                    fill: `${
                      isAnimeDiscomended
                        ? "rgb(232, 93, 117)"
                        : "rgba(255, 255, 255, 0.8)"
                    }`,
                    "&:hover": {
                      fill: "rgb(232, 93, 117)",
                    },
                  }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.975rem",
                fontWeight: 900,
              }}
            >
              {rating}+
            </Box>
          </Box>
        )}
      </Box>
      <Link
        to={animeRoute}
        style={{
          color: "rgb(92, 114, 138)",
          fontSize: "0.8rem",
        }}
      >
        {englishTitle}
      </Link>
    </Box>
  );
};

export default AnimeDetailsRecommendationItem;
