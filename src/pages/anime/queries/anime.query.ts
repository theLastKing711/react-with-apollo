import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
query animeAllTimePopular($type: MediaType = ANIME, $perPage: Int = 6, $isMain: Boolean = true, $sort: [MediaSort] = [POPULARITY_DESC], $season: MediaSeason, $seasonYear: Int) {
    Page(perPage: $perPage) {
      media(type: $type, sort: $sort, season: $season, seasonYear: $seasonYear) {
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
export const GET_ANIME_LIST2 = gql`
query animeAllTimePopular2($type: MediaType = ANIME, $perPage: Int = 6, $isMain: Boolean = true, $sort: [MediaSort] = [POPULARITY_DESC], $season: MediaSeason, $seasonYear: Int) {
    Page(perPage: $perPage) {
      media(type: $type, sort: $sort, season: $season, seasonYear: $seasonYear) {
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


export const GET_ANIME_TRENDING_NOW = gql`
query animeTrendingNow($type: MediaType = ANIME, $perPage: Int = 6, $isMain: Boolean = true, $sort: [MediaSort] = [POPULARITY_DESC]) {
    Page(perPage: $perPage) {
      media(type: $type, sort: $sort) {
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

export const GET_ANIME_ALL_TIME_POPULAR = gql`
query animeAllTimePopular($type: MediaType = ANIME, $perPage: Int = 6, $isMain: Boolean = true, $sort: [MediaSort] = [POPULARITY_DESC]) {
    Page(perPage: $perPage) {
      media(type: $type, sort: $sort) {
        id
        description
        title {
          romaji
        }
        status(version: 2)
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
        popularity
      }
    }
  }
`

export const GET_TOP_ANIME = gql`
query topAnimeList($type: MediaType = ANIME, $perPage: Int = 10, $isMain: Boolean = true, $sort: [MediaSort] = [SCORE_DESC]) {
    Page(perPage: $perPage) {
      media(type: $type, sort: $sort) {
        id
        description
        title {
          english
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