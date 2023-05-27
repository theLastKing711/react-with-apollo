import { gql } from "@apollo/client";

export const GET_ANIME_FULL_TRENDING_NOW = gql`
query animeFullTrendingList(
  $type: MediaType = ANIME,
  $search: String,
  $perPage: Int = 10,
  $page: Int = 1,
  $isMain: Boolean = true,
  $sort: [MediaSort] = [TRENDING_DESC],
  $season: MediaSeason,
  $seasonYear:Int ,
  $genre_not_in: [String],
  $genre_in: [String],
  $format_not_in: [MediaFormat],
  $format_in: [MediaFormat],
  $status: MediaStatus
  ) {
    Page(perPage: $perPage, page: $page) {

      pageInfo {
          currentPage
          perPage
          hasNextPage
          total
      }
      
      media(
        type: $type,
        search: $search,
        sort: $sort,
        season: $season,
        seasonYear: $seasonYear,
        genre_not_in: $genre_not_in,
        genre_in: $genre_in,
        format_not_in: $format_not_in,
        format_in: $format_in,
        status: $status
        ) {
        id
        description
        title {
          romaji
        }
        season
        seasonYear
        coverImage {
          large
          medium
          color
        }
        nextAiringEpisode {
          episode
          timeUntilAiring
        }
        meanScore
        studios(isMain: $isMain) {
          nodes {
            name
          }
        }
        episodes
        type
        genres
        averageScore
        format
      }
    }
  }
  `