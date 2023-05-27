import { gql } from "@apollo/client";

export const GET_ANIME_DETAILS = gql`
query getAnime($type: MediaType, $id: Int) {
    Media(type: $type, id: $id) {
      id
      isFavourite
      title {
        english
        romaji
        native
      }
      mediaListEntry {
        id
        mediaId
        status
        score
        progress
        startedAt {
          day
          month
          year
        }
        completedAt{
          day
          month
          year
        }
        repeat
        notes
        private
      }
      synonyms
      format
      episodes
      duration
      status
      startDate {
        day
        month
        year
      }
      endDate {
        day
        month
        year
      }
      popularity
      favourites
      studios {
        nodes {
          name
        }
      }
      meanScore
      averageScore
      bannerImage
      coverImage {
        large
        medium
        color
      }
      description(asHtml: true)
      tags {
        name
        rank
        description
      }
      rankings {
        allTime
        context
        rank
        season
        year
      }
      hashtag
      genres
      season
      seasonYear
      source
    }
}
`

export const GET_ANIME_OVERVIEW_DATA = gql`
query getAnimeOverviewData(
  $type: MediaType, 
  $id: Int
  $characterSort: [CharacterSort],
  $characterPerPage: Int,
  $staffSort: [StaffSort]=[RELEVANCE, ID],
  $staffPerPage: Int
  ) {
  Media(type: $type, id: $id) {
    relations {
      nodes {
        source
        title {
          english
        }
        type
        status
        coverImage {
        medium
        } 
      }
    }
    stats {
      scoreDistribution {
        amount
        score
      }
      statusDistribution {
        amount
        status
      }
    }
    characters(sort: $characterSort, perPage: $characterPerPage) {
      edges {
        node {
          id
          name {
            full
          }
          image {
            large
            medium
          }
        }
        role
        voiceActors {
          languageV2
          name {
            full
          }
          image {
            medium
          }
        }
      }
    }
    staff(sort: $staffSort, perPage: $staffPerPage) {
      edges {
        role
        node {
          name {
            full
          }
          image {
            medium
          }
        }
      }
    }
    streamingEpisodes {
      site
      thumbnail
      title
      url
    }
    trailer {
      id
      site
      thumbnail
    }
  }
}
`

export const GET_ANIME_RECOMMENDATIONS = gql`
query getAnimeRecommendations(
  $type: MediaType, 
  $id: Int 
  ) {
  Media(type: $type, id: $id) {
    id
    recommendations {
      nodes {
        id
        rating
        userRating
        mediaRecommendation {
          id
          favourites
          isFavourite
          mediaListEntry {
            user {
              isFollowing
            }
          }
          coverImage {
            medium
            large
          }
          title {
            english
          }
        }
      }
    }
  }
}
`

export const GET_ANIME_STATS = gql`
query getAnime($type: MediaType, $id: Int) {
  Media(type: $type, id: $id) {
    trends(sort: ID_DESC) {
      nodes {
        averageScore
        date
        inProgress
        mediaId
        popularity
        trending
        episode
      }
    }
    airingTrend:trends(releasing: true, sort: EPISODE_DESC) {
      nodes {
        averageScore
        date
        inProgress
        mediaId
        popularity
        trending
        episode
      }
    }
    rankings {
      allTime
      context
      format
      id
      rank
      season
      type
      year
    }
    stats {
      scoreDistribution {
        amount
        score
      }
      statusDistribution {
        amount
        status
      }
    }
  }
} 
`
export const GET_ANIME_STAFF = gql`

query getAnimeStaff(
  $type: MediaType, 
  $id: Int,
  $staffSort: [StaffSort]=[RELEVANCE, ID],

  ) {

  Media(type: $type, id: $id) {

    staff(sort: $staffSort) {
      edges {
        role
        node {
          name {
            full
          }
          image {
            medium
          }
        }
      }
    }
    
  }
} 

`

export const GET_ANIME_CHARACTERS = gql`
query getAnimeCharacters(
  $type: MediaType, 
  $id: Int,
  $characterSort: [CharacterSort] = [ROLE, RELEVANCE, ID]
  ) {
    Media(type: $type, id: $id) {
      characters(sort: $characterSort) {
        edges {
          node {
            id
            name {
              full
            }
            image {
              large
              medium
            }
          }
          role
          voiceActors {
            languageV2
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
    }
}
`

export const GET_ANIME_STREAMING_EPISODES = gql`
query getAnimeStremingEpisodes(
  $type: MediaType, 
  $id: Int
  ) {
  Media(type: $type, id: $id) {
    streamingEpisodes {
      site
      thumbnail
      title
      url
    }
  }
}`

export const GET_ANIME_MEDIA_LIST_ENTRY = gql`
query getMediaListEntry($type: MediaType, $id: Int) {
  Media(type: $type, id: $id) {
    mediaListEntry {
      id
      mediaId
      status
      score
      progress
      startedAt {
        day
        month
        year
      }
      completedAt{
        day
        month
        year
      }
      repeat
      notes
      private
    }
  }
}
`
