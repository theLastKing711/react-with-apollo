import { Box } from "@mui/material";
import { AnimeMain } from "../anime.type";
import { Link } from "react-router-dom";
import AnimeItemToolTip from "./AnimeItemToolTip";
import { useResize } from "../../../shared/hook/useResize";

interface Props {
  anime: AnimeMain;
  hasRanking?: boolean;
  rank: number;
}

const MainAnimeListItem = ({ anime, rank, hasRanking = false }: Props) => {
  const screenWidth = useResize();

  const isToolTipShown = screenWidth >= 800;

  const animeDetailsLink = `/anime/${anime.id}`;

  return (
    <AnimeItemToolTip
      placement="left"
      animeInfo={anime}
      isVisible={isToolTipShown}
    >
      <Box sx={{ position: "relative" }}>
        <Link to={animeDetailsLink}>
          <Box sx={{ position: "relative", paddingTop: "143.47%" }}>
            <Box
              component="img"
              src={anime.coverImage.large}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "0.5rem",
              fontSize: "0.825rem",
              color: "rgb(227, 79, 133)",
              "&:hover": {
                color: "rgb(127, 131, 151)",
              },
            }}
          >
            {anime.title.romaji}
          </Box>
        </Link>
        {hasRanking && (
          <Box
            sx={{
              position: "absolute",
              top: -12,
              left: -12,
              display: "flex",
              backgroundColor: anime.coverImage.color,
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.925rem",
              "@media screen and (max-width: 800px)": {
                fontSize: "0.725rem",
                width: "35px",
                height: "35px",
              },
            }}
          >
            #{rank}
          </Box>
        )}
      </Box>
    </AnimeItemToolTip>
  );
};

export default MainAnimeListItem;
