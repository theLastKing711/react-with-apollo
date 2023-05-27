export interface Characters {
    id: number;
    image: CharacterImageSizes;
    name: CharachterNames;
    isFavourite: boolean;
}

interface CharacterImageSizes {
    medium: string;
    large: string;
}

interface CharachterNames {
    full: string;
    native: string;
    alternative: string[];
    alternativeSpoiler: string[];
}

export interface CharacterDetails {
    Character: CharacterDetailsBasic;
}

export interface CharacterDetailsAnimeList {
    Character: {
        media: CharacterDetailsMedia;
    }
}

export interface CharacterDetailsBasic {
    id: number;
    image: CharacterImageSizes;
    name: CharachterNames;
    age: string;
    bloodType: string;
    description: string;
    siteUrl: string;
    dateOfBirth: CharacterDateBirth;
    isFavourite: boolean;
    favourites: number;
    media: CharacterDetailsMedia;
}

export interface CharacterToggleFavourite {
    ToggleFavourite: {
        characters: {
            nodes: CharacterDetailsBasic[]
        }
    }
}

export interface CharacterDateBirth {
    day: number;
    month: number; 
    year: number;
}

export enum SortEnum {    
    FAVOURITES,
    FAVOURITES_DESC,
    ID,
    ID_DESC,
    RELEVANCE,
    ROLE,
    ROLE_DESC,
    SEARCH_MATCH,
}

export type CharacterSort = 
    "ID" 
    | "ID_DESC" 
    | "ROLE" 
    | "ROLE_DESC"
    | "SEARCH_MATCH"
    | "FAVOURITES"
    | "FAVOURITES_DESC"
    | "RELEVANCE"

export type StaffSort = 
"ID" 
| "ID_DESC" 
| "ROLE" 
| "ROLE_DESC"
| "LANGUAGE"
| "LANGUAGE_DESC"
| "SEARCH_MATCH"
| "FAVOURITES"
| "FAVOURITES_DESC"
| "RELEVANCE"


interface CharacterDetailsMedia {
    nodes: CharacterDetailsMediaNode[]
}

export interface CharacterDetailsMediaNode {
        id: number;
        coverImage: {
            large: string;
            medium: string;
        }
        title: {
            romaji: string;
        }
}

export interface CharacterAnimeFilter {
    title: string;
    value: string;
}

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";