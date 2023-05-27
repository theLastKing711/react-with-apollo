import {
  AnimeTitleDetails,
  MediaFormat,
  MediaSource,
  MediaStatus,
} from "../anime-details.type";
import { graphQlDateResponse } from "../../../shared/shared.type";
import { Season } from "../../anime/anime.type";
import { Box, BoxProps } from "@mui/material";
import { toUpperCaseFirstChar } from "../../../shared/shared.util";

const StyledInfoType = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      fontSize: "0.8125rem",
      color: "rgb(92, 114, 138)",
      fontWeight: 500,
      paddingBottom: "0.25rem",
      whiteSpace: "nowrap",
    }}
  />
);

const StyledInfoValue = (props: BoxProps & { isnative?: string }) => (
  <Box
    sx={{
      fontSize: "0.75rem",
      color: "rgb(146, 153, 161)",
      paddingBottom: "0.25rem",
      "@media screen and (max-width: 800px)": {
        whiteSpace: "nowrap",
        fontSize: "0.95rem",
        lineHeight: props.isnative === "true" ? 1.3 : 1.4,
      },
    }}
    {...props}
  />
);

const StyledSubListContainer = (props: BoxProps) => (
  <Box
    component="ul"
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      "@media screen and (max-width: 800px)": {
        flexDirection: "row",
        gap: "0.35rem",
        "& > li": {
          fontSize: "0.95rem",
          ":last-child": {
            paddingRight: "1rem",
          },
        },
        "& > li:not(:last-child)::after": {
          content: "','",
          display: "inline",
        },
      },
    }}
  ></Box>
);

const StyledSubListItem = (props: BoxProps) => (
  <Box
    component="li"
    {...props}
    sx={{
      fontSize: "0.75rem",
      color: "rgb(146, 153, 161)",
      paddingBottom: "0.25rem",
      "@media screen and (max-width: 800px)": {
        whiteSpace: "nowrap",
        fontSize: "0.95rem",
        // "&::after": {
        //   content: "','",
        //   display: "inline",
        // },
      },
    }}
  />
);

interface Props {
  animeInfo: {
    format: MediaFormat;
    episodes: number;
    duration: number;
    status: MediaStatus;
    startDate: graphQlDateResponse;
    endDate: graphQlDateResponse;
    season: Season;
    popularity: number;
    favourites: number;
    studios: string;
    title: AnimeTitleDetails;
    genres: string[];
    synonyms: string[];
    seasonYear: number;
    averageScore: number;
    meanScore: number;
    source: MediaSource;
    hashtag: string;
  };
}

const AnimeDetailsGeneralInfo = ({ animeInfo }: Props) => {
  const formatDate = (date: graphQlDateResponse) => {
    console.log("data", date);
    const { month, day, year } = date;

    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      undefined,
      { month: "short", year: "numeric", day: "numeric" }
    );

    return formattedDate;
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        borderRadius: "2px",
        backgroundColor: "white",
        overflow: "auto",
      }}
    >
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          "@media screen and (max-width: 800px)": {
            flexDirection: "row",
            gap: "1.5rem",
          },
        }}
      >
        <Box component="li">
          <StyledInfoType>Format</StyledInfoType>
          <StyledInfoValue>{animeInfo.format}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Episodes</StyledInfoType>
          <StyledInfoValue>{animeInfo.episodes}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Episode Duration</StyledInfoType>
          <StyledInfoValue>{animeInfo.duration} mins</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Status</StyledInfoType>
          <StyledInfoValue>
            {toUpperCaseFirstChar(animeInfo.status)}
          </StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Start Date</StyledInfoType>
          <StyledInfoValue>{formatDate(animeInfo.startDate)}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>End Date</StyledInfoType>
          <StyledInfoValue>{formatDate(animeInfo.endDate)}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Average Score</StyledInfoType>
          <StyledInfoValue>{animeInfo.averageScore}%</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Mean Score</StyledInfoType>
          <StyledInfoValue>{animeInfo.meanScore}%</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Favorites</StyledInfoType>
          <StyledInfoValue>{animeInfo.favourites}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Studios</StyledInfoType>
          <StyledInfoValue>{animeInfo.studios}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Source</StyledInfoType>
          <StyledInfoValue>
            {toUpperCaseFirstChar(animeInfo.source)}
          </StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Hashtag</StyledInfoType>
          <StyledInfoValue>{animeInfo.hashtag}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Genres</StyledInfoType>
          <StyledSubListContainer>
            {animeInfo.genres.map((genre, key) => (
              <StyledSubListItem key={key}>{genre}</StyledSubListItem>
            ))}
          </StyledSubListContainer>
        </Box>
        <Box component="li">
          <StyledInfoType>Romaji</StyledInfoType>
          <StyledInfoValue>{animeInfo.title.romaji}</StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Native</StyledInfoType>
          <StyledInfoValue isnative="true">
            {animeInfo.title.native}
          </StyledInfoValue>
        </Box>
        <Box component="li">
          <StyledInfoType>Synonyms</StyledInfoType>
          <StyledSubListContainer>
            {animeInfo.synonyms.map((synonym, key) => (
              <StyledSubListItem key={key}>{synonym}</StyledSubListItem>
            ))}
          </StyledSubListContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeDetailsGeneralInfo;
