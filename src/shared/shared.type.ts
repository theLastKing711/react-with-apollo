
export type PageType = "characters" | "animes";

export interface Page<T> {
    Page: {
        pageInfo: PageInfo;
        
        characters: Array<T>;
    }
}

export interface PageInfo {
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    total: number;
}

export interface LikeableType {

}

// export type SelectSearch = typeof searchSelectList[number];

interface ToggleFavouriteMutationProps {
    animeId: number;
    mangaId: number;
    characterId: number;
    staffId: number;
    studioId:number;
}

export interface ListItem {
    label: string;
    value: string;
}

export interface graphQlDateResponse {
    day: number;
    month: number;
    year: number;
}


export interface ImageResponse {
    large: string;
    medium: string;
}

export interface CoverImageResponse {
    color: string;
    extraLarge: string;
    large: string;
    medium: string;
}

export interface NameResponse {
    full: string;
}

export interface BarChartItem {
    name: string;
    amount: number | number[];
    fill: string;
} 

export type RecommendationRating =
    "NO_RATING" |
    "RATE_UP" |
    "RATE_DOWN";

export interface FuzzyDateInput {
    day: number | null;
    month: number | null;
    year: number | null;
}