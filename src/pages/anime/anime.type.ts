import { RecommendationRating } from './../../shared/shared.type';
import { PageInfo } from "../../shared/shared.type";

export interface AnimeListPage<T> {
    Page: {
        pageInfo: PageInfo;
        
        media: T[];
    }
}


export interface AnimeMain {
    id: number;
    description: string;
    title: {
        romaji: string;
    };
    season: string;
    seasonYear: number;
    nextAiringEpisode: {
        episode: number;
        timeUntilAiring: number;
    };
    coverImage: {
        large: string;
        medium: string;
        color: string;
    }
    meanScore: number;
    studios: {
        nodes: {name: string}[]
    };
    episodes: number | null;
    type: "ANIME" | "MANGA";
    genres: string[];
    averageScore: number;
    format: "TV";
}

export interface TopAnime extends AnimeMain {
    popularity: number;
    status: string;
}

export interface AnimeTagFilter {    
    name: string;
}


export interface AnimeGenreAndTagCollections {
    MediaTagCollection: AnimeTagFilter[];
    GenreCollection: string[];
}

export interface AnimeGenreItem {
    name: string,
    group: string
}

export type Season = "WINTER" | "FALL" |"SUMMER" | "SPRING";  


export type AnimeQueryFilter = 
    "search" 
    | "sort"
    | "season" 
    | "seasonYear"
    | "genre_in"
    | "format_in"
    | "status"
    | "genre_not_in"
    | "format_not_in"
    | "status_not_in";

    export type queryParamFilterType = {
        search: string | undefined, 
        sort: string | undefined,
        season: string | undefined,
        seasonYear: string | undefined,
        format_in: string[] | undefined,
        genre_in: string[] | undefined,
        status: string | undefined,
        genre_not_in: string | undefined,
        format_not_in: string | undefined,
        status_not_in: string[] | undefined
    };

    export type AnimeTagFilterItem = {
        key: string;
        value: string;
    }

    export interface SaveAnimeRecommendationResponse {
        SaveRecommendation: {
            id: number;
            rating: number;
            userRating: RecommendationRating;
        }

    }

    export interface ToggleAnimeFavouriteResponse {
        ToggleFavourite: {
            anime: {
                nodes: {id: number, isFavourite: boolean}[]
            }
        }
    }
    
    
    export type MediaListStatus = "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED" | "REPEATING";