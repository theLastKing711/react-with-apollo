import { Box } from "@mui/material";
import React from "react";
import { useGetAnimeOverviewData } from "../../hooks/useGetAnimeOverviewData";
import { usePostAnimeSaveRecommendation } from "../../hooks/usePostAnimeSaveRecommendation";
import AnimeDetailsCharactersSection from "../../components/anime-details-characters/AnimeDetailsCharactersSection";
import AnimeDetailsRecommendation from "../../components/anime-details-recommendation/AnimeDetailsRecommendation";
import AnimeDetailsRelationsSection from "../../components/anime-details-relations/AnimeDetailsRelationsSection";
import AnimeDetailsStaffSection from "../../components/anime-details-staff/AnimeDetailsStaffSection";
import AnimeDetailOverviewStats from "../../components/anime-details-stats/AnimeDetailOverviewStats";
import AnimeDetailsWatch from "../../components/anime-details-watch/AnimeDetailsWatch";
import AnimeStatsTrailer from "../../components/anime-stats-trailer/AnimeStatsTrailer";
import { useGetAnimeRecommendations } from "../../hooks/useGetAnimeRecommendations";
import { useLocation } from "react-router-dom";

const AnimeOverviewMain = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data: overviewData, loading: overviewLoading } =
    useGetAnimeOverviewData({ id: parseInt(id) });

  const {
    data: AnimeRecommendationsData,
    loading: AnimeRecommendationsLoading,
  } = useGetAnimeRecommendations({ id: parseInt(id) });

  const {
    data: saveRecommendationData,
    loading: saveRecommendationLoading,
    toggleAnimeSaveRecommendation,
  } = usePostAnimeSaveRecommendation({
    mediaId: parseInt(id),
    rating: "NO_RATING",
    mediaRecommendationId: 1,
  });

  const firstSixAnimeCharacters =
    overviewData?.Media.characters.edges.slice(0, 6) || [];

  const recommendAnime = (mediaRecommendationId: number) => {
    toggleAnimeSaveRecommendation({ mediaRecommendationId, rating: "RATE_UP" });
  };

  const discommendAnime = (mediaRecommendationId: number) => {
    toggleAnimeSaveRecommendation({
      mediaRecommendationId,
      rating: "RATE_DOWN",
    });
  };

  const removeAnimeRecommendation = (mediaRecommendationId: number) => {
    toggleAnimeSaveRecommendation({
      mediaRecommendationId,
      rating: "NO_RATING",
    });
  };
  const firstFourAnimeEpisodes =
    overviewData?.Media.streamingEpisodes.slice(0, 4) || [];

  return (
    <Box>
      {overviewData && (
        <AnimeDetailsRelationsSection
          nodes={overviewData.Media.relations.nodes}
          title="Relations"
        />
      )}
      {overviewData && (
        <AnimeDetailsCharactersSection edges={firstSixAnimeCharacters} />
      )}
      {overviewData && (
        <AnimeDetailsStaffSection edges={overviewData.Media.staff.edges} />
      )}
      {overviewData && (
        <AnimeDetailOverviewStats
          scoreDistribution={overviewData.Media.stats.scoreDistribution}
          statusDistribution={overviewData.Media.stats.statusDistribution}
        />
      )}
      {overviewData && (
        <AnimeDetailsWatch animeWatchList={firstFourAnimeEpisodes} />
      )}
      {overviewData && overviewData.Media.trailer && (
        <AnimeStatsTrailer trailerInfo={overviewData.Media.trailer} />
      )}
      {AnimeRecommendationsData && (
        <AnimeDetailsRecommendation
          nodes={AnimeRecommendationsData.Media.recommendations.nodes}
          recommendAnime={recommendAnime}
          discommendAnime={discommendAnime}
          removeAnimeRecommendation={removeAnimeRecommendation}
        />
      )}
    </Box>
  );
};

export default AnimeOverviewMain;
