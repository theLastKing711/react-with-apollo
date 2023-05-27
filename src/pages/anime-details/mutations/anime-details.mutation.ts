import { gql } from "@apollo/client";

export const POST_ANIME_TOGGLE_FAVOURITE = gql`
mutation toggleFavourite($id: Int) {
    ToggleFavourite(animeId: $id) {
      anime {
        nodes {
          id
          isFavourite
        }
      }
    }
  }
`
export const POST_ANIME_SAVE_RECOMMENDATION = gql`
mutation SaveRecommendation(
  $mediaId: Int,
  $rating: RecommendationRating,
  $mediaRecommendationId: Int
  ) {
  SaveRecommendation(mediaId: $mediaId, rating: $rating, mediaRecommendationId: $mediaRecommendationId ) {       
    id
    rating
    userRating
  }
}
`


export const POST_ANIME_MEDIA_LIST_ENTRY = gql`
mutation SaveMediaListEntry(
  $mediaId: Int,
  $status: MediaListStatus,
  $score: Float,
  $progress: Int, 
  $startedAt: FuzzyDateInput, 
  $completedAt: FuzzyDateInput,
  $repeat: Int,
  $notes: String,
  $private: Boolean
  ) {
    SaveMediaListEntry(
    mediaId: $mediaId,
    status: $status,
    score: $score,
    progress: $progress,
    startedAt: $startedAt,
    completedAt: $completedAt,
    repeat: $repeat,
    notes: $notes,
    private: $private
  ) 
  {
    media {
      id
    }
    id
    mediaId
    status
    score
    progress
    startedAt{
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
`
export const DELETE_ANIME_MEDIA_LIST_ENTRY = gql`
mutation DeleteMediaListEntry($id: Int) {
  DeleteMediaListEntry(
    id: $id
  ) {
    deleted
  }
}
`