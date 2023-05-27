import { Box } from "@mui/material";
import { TopAnime } from "../../../anime/anime.type";
import {
  formatDayCount,
  formatHourCount,
  formatMinutesCount,
  toUpperCaseFirstChar,
} from "../../../../shared/shared.util";
import AnimeScoreEmoji from "../../../anime/components/AnimeScoreEmoji";
import AnimeTagList from "../../../anime/components/AnimeTagList";
import { useResize } from "../../../../shared/hook/useResize";
import convert from "color-convert";
import { Link } from "react-router-dom";

const MAX_GENRES_TO_SHOW = 2;

interface Props<T extends boolean> {
  animeInfo: TopAnime;
  isRanked?: T;
  rank?: T extends true ? number : undefined;
}

const AnimeBigListViewItem = <T extends boolean = false>({
  animeInfo,
  isRanked,
  rank,
}: Props<T>) => {
  const screenWidth = useResize();

  const shouldDisplayRating = screenWidth >= 500;

  const getNextEpisodeNumberText = () => {
    return `Ep ${animeInfo.nextAiringEpisode.episode} in`;
  };
  const getNexAiringEpisodeInDaysAndHours = () => {
    const nextTimeAiringInMinute =
      animeInfo.nextAiringEpisode.timeUntilAiring / 60;
    const nextTimeAiringInHour = nextTimeAiringInMinute / 60;
    const nextTimeAiringInDays = nextTimeAiringInHour / 24;

    const days = Math.floor(nextTimeAiringInDays).toString();

    const hours = Math.floor(nextTimeAiringInHour % 24).toString();

    const minutes = Math.floor(nextTimeAiringInMinute % 60).toString();

    return [days, hours, minutes];
  };

  const getNextEpisodeAiringTime = () => {
    const [days, hours, minutes] = getNexAiringEpisodeInDaysAndHours();

    const daysTextFormatted = formatDayCount(days);
    const hoursTextFormatted = formatHourCount(hours);
    const minutesTextFormatted = formatMinutesCount(minutes);

    if (days === "0" && hours === "0") {
      return `${minutesTextFormatted}`;
    }

    if (days === "0") {
      return `${hoursTextFormatted}, ${minutesTextFormatted}`;
    }

    return `${daysTextFormatted}, ${hoursTextFormatted}`;
  };

  const getAnimeSeasonYearFormatted = () => {
    const capitalizedSeason = toUpperCaseFirstChar(animeInfo.season);

    return `${capitalizedSeason} ${animeInfo.seasonYear}`;
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

  const hasAiringTime = Boolean(animeInfo.nextAiringEpisode);

  const colorAsRgb = convert.hex
    .rgb(animeInfo.coverImage.color || "#222")
    .join(",");

  const genresList = animeInfo.genres.slice(0, MAX_GENRES_TO_SHOW);

  const animeLink = `/anime/${animeInfo.id}`;

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "0 1px 8px purple",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "0 0 170px",
          "@media screen and (max-width: 500px)": {
            flex: "0 0 135px",
          },
        }}
      >
        <Link
          style={{
            position: "relative",
            paddingTop: "143.4%",
            display: "block",
          }}
          to={animeLink}
        >
          <Box
            component="img"
            sx={{
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={animeInfo.coverImage.large}
          ></Box>
          <Box
            sx={{
              content: "''",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "0.825rem",
              backgroundColor: "rgba(31, 38, 49, 0.9)",
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: `rgba(${colorAsRgb}, 0.1)`,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              sx={{
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                color: "rgb(255, 255, 255)",
                fontWeight: 600,
              }}
            >
              {animeInfo.title.romaji}
            </Box>
            <Box
              sx={{
                fontSize: "0.75rem",
                color: animeInfo.coverImage.color,
                fontWeight: 600,
              }}
            >
              {animeInfo.studios.nodes[0].name}
            </Box>
          </Box>
        </Link>
        <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0)", fontSize: "0.875rem" }}>
          <Box
            sx={{
              color: "rgba(255, 255, 255)",
            }}
          ></Box>
          <Box
            sx={{
              color: "rgb(117, 225, 240)",
            }}
          ></Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            minHeight: 0,
            "&:hover": {
              overflow: "auto",
              ".description": {
                WebkitLineClamp: "none",
                lineClamp: "none",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 1rem 0",
            }}
          >
            <Box>
              {hasAiringTime && (
                <Box sx={{ marginBottom: "0.5rem" }}>
                  <Box
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "rgb(116, 136, 153)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {getNextEpisodeNumberText()}
                  </Box>
                  <Box
                    sx={{
                      color: "rgb(100, 115, 128)",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {getNextEpisodeAiringTime()}
                  </Box>
                </Box>
              )}

              {!hasAiringTime && animeInfo.season && (
                <Box
                  sx={{
                    color: "rgb(100, 115, 128)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {getAnimeSeasonYearFormatted()}
                </Box>
              )}

              <Box
                sx={{
                  color: "rgb(116, 136, 153)",
                  fontSize: "0.6875rem",
                  marginBottom: "0.5rem",
                }}
              >
                {formatShowType() + formatAnimeEpisodes()}
              </Box>
            </Box>
            {shouldDisplayRating && !isRanked && (
              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                <AnimeScoreEmoji size="small" score={animeInfo.averageScore} />
                <Box
                  sx={{
                    color: "rgb(116, 136, 153)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}
                >
                  {animeInfo.averageScore}%
                </Box>
              </Box>
            )}
            {isRanked && (
              <Box
                sx={{
                  color: animeInfo.coverImage.color || "black",
                  fontSize: "1rem",
                }}
              >
                #{rank}
              </Box>
            )}
          </Box>

          <Box
            dangerouslySetInnerHTML={{
              __html: animeInfo.description,
            }}
            sx={{
              color: "rgb(104, 119, 133)",
              fontSize: "0.6875rem",
              display: "-webkit-box",
              boxOrient: "vertical",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s",
              padding: "0 1rem",
              lineHeight: "17.6px",
              "&:hover": {
                color: "rgb(118, 136, 151)",
                WebkitLineClamp: "none",
                paddingBottom: "1rem",
              },
              "@media screen and (max-width: 500px)": {
                WebkitLineClamp: 5,
              },
            }}
            className="description"
          ></Box>
        </Box>

        <Box
          sx={{
            color: "rgb(92, 114, 138)",
            fonSize: "1rem",
          }}
        ></Box>
        <Box
          sx={{
            backgroundColor: "#EDF1F5",
            padding: "0.5rem",
            borderBottomRightRadius: "6px",
          }}
        >
          <AnimeTagList
            backgroundColor={animeInfo.coverImage.color}
            color="white"
            tags={genresList}
            listStyles={{
              maxHeight: "23.2px",
              overflow: "hidden",
            }}
          ></AnimeTagList>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeBigListViewItem;
