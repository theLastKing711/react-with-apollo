import { Box, BoxProps, Paper, Typography, styled } from "@mui/material";
import React from "react";
import { TopAnime } from "../../anime.type";
import AnimeTagList from "../AnimeTagList";
import AnimeScoreEmoji from "../AnimeScoreEmoji";
import {
  formatDayCount,
  toUpperCaseFirstChar,
} from "../../../../shared/shared.util";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: "0.25rem",
  fontSize: "1rem",
  fontWeight: 400,
  color: "rgba(0, 0, 0, 0.87)",
  display: "block",
  "&:hover": {
    color: "rgb(81, 97, 112)",
  },
}));

const FirstAnimeInfoText = (props: BoxProps) => (
  <Box
    sx={{
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "rgb(100, 115, 128)",
    }}
  >
    {props.children}
  </Box>
);

const SecondaryAnimeInfoText = (props: BoxProps) => (
  <Box
    sx={{
      fontSize: "0.875rem",
      fontWeight: 600,
      marginTop: "0.25rem",
      color: "rgb(139, 160, 178)",
    }}
  >
    {props.children}
  </Box>
);

interface Props {
  animeInfo: TopAnime;
  rank: number;
  hasRanking?: boolean;
}

const TopAnimeSpreadItem = ({ animeInfo, rank, hasRanking }: Props) => {
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

  const formatAnimeSeasonYear = () => {
    if (!animeInfo.season) {
      return "";
    }

    const capitalizedSeason = toUpperCaseFirstChar(animeInfo.season);

    return `${capitalizedSeason} ${animeInfo.seasonYear}`;
  };

  const animeLink = `/anime/${animeInfo.id}`;

  return (
    <Box sx={{ display: "flex", marginBottom: "1.5rem" }}>
      {hasRanking && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "0 0 100px",
            color: "rgb(139, 160, 178)",
            fontSize: "1.5rem",
          }}
        >
          #{rank}
        </Box>
      )}
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          flex: 1,
        }}
      >
        <Link
          style={{
            width: "2.75rem",
            height: "3.875rem",
            marginRight: "0.75rem",
          }}
          to={animeLink}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "2px",
              objectFit: "cover",
              height: "100%",
              display: "block",
            }}
            src={animeInfo.coverImage.large}
          />
        </Link>

        <Box
          sx={{
            flex: "1 0",
            minWidth: 0,
            marginRight: "1rem",
          }}
        >
          <StyledLink to={animeLink}>{animeInfo.title.romaji}</StyledLink>
          <AnimeTagList
            tags={animeInfo.genres}
            backgroundColor={animeInfo.coverImage.color}
            color="white"
            listStyles={{
              maxHeight: "25px",
              overflow: "hidden",
            }}
          />
        </Box>
        <Box sx={{ flex: "0 0 155px", display: "flex" }}>
          <AnimeScoreEmoji score={animeInfo.averageScore} />
          <Box
            sx={{
              marginLeft: "0.25rem",
            }}
          >
            <FirstAnimeInfoText
              sx={{
                color: "rgb(100, 115, 128)",
                fontSize: "1rem",
              }}
            >
              {animeInfo.averageScore}%
            </FirstAnimeInfoText>
            <SecondaryAnimeInfoText>
              {animeInfo.popularity} users
            </SecondaryAnimeInfoText>
          </Box>
        </Box>
        <Box sx={{ flex: "0 0 120px" }}>
          <FirstAnimeInfoText>{animeInfo.format}</FirstAnimeInfoText>
          <SecondaryAnimeInfoText>
            {animeInfo.episodes} episodes
          </SecondaryAnimeInfoText>
        </Box>
        <Box sx={{ flex: "0 0 135px" }}>
          <FirstAnimeInfoText>
            {(animeInfo.nextAiringEpisode && formatNextAiringEpisode()) ||
              formatAnimeSeasonYear()}
          </FirstAnimeInfoText>
          <SecondaryAnimeInfoText>
            {animeInfo.status && toUpperCaseFirstChar(animeInfo.status)}
          </SecondaryAnimeInfoText>
        </Box>
      </Paper>
    </Box>
  );
};

export default TopAnimeSpreadItem;
