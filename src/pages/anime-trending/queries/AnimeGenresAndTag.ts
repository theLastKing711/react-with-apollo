import { gql } from "@apollo/client";

export const GET_ANIME_GENRE_AND_TAG_COLLECTION = gql`
query animeGenresAndTags {
    MediaTagCollection {
        name
        category
      }
      GenreCollection
  }
  `