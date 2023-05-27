import { gql } from "@apollo/client";



export const POST_TOGGLE_FAVOURITE_CHARACTER = gql`
mutation ToggleFavouriteCharacter($characterId: Int) {
    ToggleFavourite(characterId: $characterId) {
      characters {
        nodes {
          id
          image {
            medium
            large
          }
          name {
            full
          }
          isFavourite
          favourites
          age
          bloodType
          description
          dateOfBirth{
            year
            month
            day
          }
          siteUrl
        }
        edges {
          id
        }
      }
    }
  }
`