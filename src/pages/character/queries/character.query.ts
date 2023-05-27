import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
    query getCharacters($page: Int = 1, $search: String, $sort: [CharacterSort] = [ROLE]) {
        Page(page: $page) {
            pageInfo {
              currentPage
              perPage
              hasNextPage
              total
            }
            characters(search: $search, sort: $sort) {
              id
              image {
                medium
              }
              name {
                full
              }
              isFavourite
            }
        } 
    }
`

export const GET_CHARACTER_DETAILS = gql`
  query getCharacterDetails($id: Int = 1, $sort: [MediaSort] = TITLE_ENGLISH) {
    Character(id: $id) {
      image {
        medium
        large
      }
      name {
        full
        native
        alternative
        alternativeSpoiler
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
      media(sort: $sort) {
        nodes {
          id
          coverImage {
            large
            color
          }
          title {
            romaji
          }
        }
      }
    } 
  }
`

export const GET_CHARACTER_DETAILS_ANIMES = gql`
  query getCharacterDetailsAnimes($id: Int = 1, $sort: [MediaSort]!) {
    Character(id: $id) {
      media(sort: $sort) {
        nodes {
          id
          coverImage {
            large
            color
          }
          title {
            romaji
          }
        }
      }
    } 
  }
`