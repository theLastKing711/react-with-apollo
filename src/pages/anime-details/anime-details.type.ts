import { FuzzyDateInput } from "../../shared/shared.type";
import { CoverImageResponse, ImageResponse, NameResponse, RecommendationRating, graphQlDateResponse } from "../../shared/shared.type";
import { CharacterRole } from "../character/character.type";

export interface AnimeDetails {
    Media: {
        isFavourite: boolean;
        title: AnimeTitleDetails;
        mediaListEntry: MediaListEntry | null;
        synonyms: string[];
        format: MediaFormat;
        episodes: number;
        duration: number;
        status: MediaStatus;
        startDate: graphQlDateResponse;
        endDate: graphQlDateResponse;
        popularity: number;
        favourites: number;
        studios: AnimeStudio;
        meanScore: number;
        averageScore: number;
        bannerImage: string;
        coverImage: AnimeDetailsCoverImage;
        description: string;
        tags: AnimeDetailsTag[];
        rankings: AnimeDetailsRankings[];
        hashtag: string;
        genres: string[];
        season: MediaSeason;
        seasonYear: number;
        source: MediaSource;
    }
}

export type MediaSource = "ORIGINAL" | "MANGA" | "LIGHT_NOVEL" | "VIDEO_GAME" | "OTHER" | "NOVEL" |"DOUJINSHI" | "ANIME" | "WEB_NOVEL" | "LIVE_ACTION" | "GAME" |"COMIC" | "MULTIMEDIA_PROJECT" | "PICTURE_BOOK";

export interface AnimeTitleDetails {
    english: string;
    romaji: string;
    native: string;
}

export type MediaFormat = 
    "MANGA" 
    | "MOVIE"
    | "MUSIC"
    | "NOVEL"
    | "ONA"
    | "ONE_SHOT" 
    | "OVA"
    | "SPECIAL"
    | "TV_SHORT"

export type MediaStatus = 
    "CANCELLED"
    | "FINISHED"
    | "HIATUS"
    | "NOT_RELEASED"
    | "RELEASING"

interface AnimeStudio {
    nodes: AnimeStudioNode[]
}

interface AnimeStudioNode {
    name: string;
}

export interface AnimeDetailsTag {
    name: string;
    rank: number;
    description: string;
}

interface AnimeDetailsCoverImage {
    large: string;
    medium: string;
    color: string;
}

export interface AnimeDetailsRankings {
    id: number;
    allTime: boolean;
    context: string;
    rank: number;
    season: MediaSeason;
    year: number;
}

export type MediaSeason = "SPRING" | "SUMMER" | "WINTER" | "WINTER";

export interface AnimeDetailsOverview {
    Media: {
        id: number;
        relations: AnimeDetailsRelationsNodes;
        stats: AnimeStats;
        characters: AnimeDetailsOverviewCharacterEdges;
        staff: AnimeStaffEdges;
        streamingEpisodes: AnimeStreamingEpisodes[];
        trailer: AnimeTrailer;
        recommendations: AnimeRecommendationsNodes;
    }
}

export interface AnimeDetailsRecommendationResponse {
    Media: {
        recommendations: AnimeRecommendationsNodes;
    }
}

export interface AnimeDetailsRelationsNodes {
    nodes: AnimeDetailRelationsItem[];
}

export interface AnimeDetailRelationsItem {
    source: MediaSource;
    title: AnimeTitleDetails;
    type: MediaType;
    status: MediaStatus;
    coverImage: Pick<CoverImageResponse, "medium">;
}

export interface AnimeDetailsOverviewCharacterEdges {
    edges: AnimeDetailsOverviewCharacterEdgesNode[];
}

export interface AnimeDetailsOverviewCharacterEdgesNode {
    node: AnimeCharactersEdgesNode;
    image: ImageResponse;
    role: CharacterRole;
    voiceActors: AnimeVoiceActors[];
}

export interface AnimeVoiceActors {
    languageV2: string;
    name: NameResponse;
    image: ImageResponse;
}

export interface AnimeCharactersEdgesNode {
    id: number;
    name: NameResponse;
    image: Pick<ImageResponse, "medium">;
}

export interface AnimeStaffEdges {
    edges: AnimeStaffEdgeNode[];
}

export interface AnimeStaffEdgeNode {
    role: string;
    node: {
        name: NameResponse;
        image: Pick<ImageResponse, "medium">;
    }    
}

export interface AnimeStreamingEpisodes {
    site: string;
    thumbnail: string;
    title: string;
    url: string;
} 

export interface AnimeTrailer {
    id: string;
    site: string;
    thumbnail: string;
}

export interface AnimeRecommendationsNodes {
    nodes: AnimeRecommendationsNode[];
}

export interface AnimeRecommendationsNode {
    id: number;
    rating: number;
    userRating: RecommendationRating;
    mediaRecommendation: {
        isFavourite: boolean;
        isFavouriteBlocked: boolean;
        favourites: number;
        coverImage:Pick<CoverImageResponse, "medium" | "large">;
        id: number;
        title: AnimeTitleDetails;
    }
}

export interface AnimeStats {
    scoreDistribution: AnimeStatScoreDistributionItem[]; 
    statusDistribution: AnimeStatsStatusDistributionItem[];
}

export interface AnimeStatScoreDistributionItem {
    amount: number;
    score: number;
}

export interface AnimeStatsStatusDistributionItem {
    amount: number;
    status: "CURRENT" 
    | "PLANNING"
    | "COMPLETED"
    | "DROPPED" 
    | "PAUSED" 
    | "REPEATING"
}



export type MediaType = "ANIME" | "MANGA";

    export interface AnimeStatsResponse { 
        Media: {
            trends: AnimeStatsTrendNodes;
            airingTrend: AnimeStatsTrendNodes;
            rankings: AnimeDetailsRankings[];
            stats: AnimeStats;
        }
    }

    interface AnimeStatsTrendNodes {
        nodes: AnimeStatsTrendNode[];
    }

    export interface AnimeStatsTrendNode {
        date: number;
        mediaId: number;
        popularity: number;
        trending: number;
        episode: number;
    }

    export interface AnimeStaffResponse {
        Media: {
            staff: AnimeStaffEdges;
        }
    }

    export interface AnimeCharactersResponse {
        Media: {
            characters: AnimeDetailsOverviewCharacterEdges;
        }
    }

    export interface AnimeStreamingEpisodesResponse {
        Media: {
            streamingEpisodes: AnimeStreamingEpisodes[];
        }
    }

    export interface MediaListEntry {
        id: number;
        mediaId: number;
        status: string;
        score: number;
        progress: number;
        startedAt: FuzzyDateInput
        completedAt: FuzzyDateInput;
        repeat: number;
        notes: string;
        private: boolean;
    }

    export interface AnimeMediaListEntryResponse {
        Media: {
            // mediaListEntry: Pick<AnimeDetails["Media"], "mediaListEntry">
            mediaListEntry: MediaListEntry | null;
        }
    }

    export interface AnimeAddMediaListEntryResponse {
        SaveMediaListEntry: MediaListEntry | null;
    }