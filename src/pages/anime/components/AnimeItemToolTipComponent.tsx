import { Box, Tooltip, Typography } from "@mui/material";
import { AnimeMain } from "../anime.type";
import AnimeTagList from "./AnimeTagList";
import AnimeScoreEmoji from "./AnimeScoreEmoji";
import {
  formatDayCount,
  toUpperCaseFirstChar,
} from "../../../shared/shared.util";

export interface AnimeToolTipComponentProps
  extends Pick<
    AnimeMain,
    | "averageScore"
    | "nextAiringEpisode"
    | "episodes"
    | "studios"
    | "type"
    | "format"
    | "genres"
    | "coverImage"
    | "season"
    | "seasonYear"
  > {}

const maxGenreToShow = 3;

interface Props {
  animeInfo: AnimeToolTipComponentProps;
}

const AnimeItemToolTipComponent = ({ animeInfo }: Props) => {
  const formatNextAiringEpisode = () => {
    const nextAiringEpisode = `Ep
      ${animeInfo.nextAiringEpisode.episode} in 
      ${formatDayCount(nextAiringEpisodeInDays())}`;

    return nextAiringEpisode;
  };

  const nextAiringEpisodeInDays = () => {
    const nextTimeAiringInMinute =
      animeInfo.nextAiringEpisode.timeUntilAiring / 60;
    const nextTimeAiringInHour = nextTimeAiringInMinute / 60;
    const nextTimeAiringInDays = nextTimeAiringInHour / 24;

    return nextTimeAiringInDays.toFixed(0);
  };

  const formatShowType = () => {
    if (animeInfo.format == "TV") {
      return `TV SHOW `;
    }

    return animeInfo.format;
  };

  const formatAnimeEpisodes = () => {
    if (animeInfo.episodes) {
      return ` • ${animeInfo.episodes} episodes`;
    }

    return "";
  };

  const formatAnimeSeasonYear = () => {
    const capitalizedSeason = toUpperCaseFirstChar(animeInfo.season);

    return `${capitalizedSeason} ${animeInfo.seasonYear}`;
  };

  const slicedGenreList = animeInfo.genres.slice(0, maxGenreToShow);

  const tagColorBlackifBgWhite = animeInfo.coverImage.color
    ? "white"
    : animeInfo.coverImage.color;
  const textBgrWhiteIfBgWhite = animeInfo.coverImage.color
    ? animeInfo.coverImage.color
    : "grey";

  return (
    <Box
      sx={{
        minWidth: "250px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          fontWeight: 600,
        }}
      >
        <Typography
          sx={{
            color: "rgb(100, 115, 128)",
            fontSize: "1rem",
          }}
        >
          {(animeInfo.nextAiringEpisode && formatNextAiringEpisode()) ||
            formatAnimeSeasonYear()}
        </Typography>
        {animeInfo.averageScore && (
          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
            }}
          >
            <Typography
              sx={{
                color: "rgb(100, 115, 128)",
                fontSize: "1rem",
              }}
            >
              {animeInfo.averageScore}%
            </Typography>
            <AnimeScoreEmoji score={animeInfo.averageScore} />
          </Box>
        )}
      </Box>
      <Typography
        sx={{
          color: "rgb(138, 44, 15)",
          marginBottom: "0.25rem",
        }}
      >
        {animeInfo.studios.nodes[0].name}
      </Typography>
      <Box
        sx={{
          marginBottom: "1rem",
          color: "rgb(116, 136, 153)",
          fontSize: "0.8125rem",
        }}
      >
        {formatShowType() + formatAnimeEpisodes()}
      </Box>
      <AnimeTagList
        tags={slicedGenreList}
        backgroundColor={textBgrWhiteIfBgWhite}
        color={tagColorBlackifBgWhite}
      />
    </Box>
  );
};

export default AnimeItemToolTipComponent;
