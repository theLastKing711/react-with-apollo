import { Season } from "../pages/anime/anime.type";
import { CharacterAnimeFilter } from "../pages/character/character.type"
import { ListItem } from "./shared.type";
import { buildValueToLabelMap } from "./shared.util";
import { generateYearsUntilNextYear } from "./shared.util";

export const footerNavUrls = [ 
    {
        name: "Logout", 
        url: "https://anilist.co/character/50389/Rias-Gremory#"
    },
    {
        name: "Donate",
        url: "https://anilist.co/forum/thread/2340"
    },
    {
        name: "AniList.co",
        url: "https://anilist.co/"
    },
    {
        name: "AniChart.net",
        url: "http://anichart.net/"
    },
    {
        name: "Apps",
        url: "https://anilist.co/apps"
    },
    {
        name: "Site Stats",
        url: "https://anilist.co/site-stats"
    },
    {
        name: "Recommendations",
        url: "https://anilist.co/recommendations"
    },
    {
        name: "API",
        url: "https://github.com/AniList/ApiV2-GraphQL-Docs"
    },
    {
        name: "Discord",
        url: "https://discord.gg/TF428cr"
    },
    {
        name: "Twitter",
        url: "https://twitter.com/AniListco"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/AniListco"
    },
    {
        name: "Github",
        url: "https://github.com/AniList"
    },
    {
        name: "Add Data",
        url: "https://submission-manual.anilist.co/"
    },
    {
        name: "Moderators",
        url: "https://anilist.co/moderators"
    },
    {
        name: "Contact",
        url: "contact@anilist.co"
    },
    {
        name: "https://anilist.co/terms",
        url: "https://anilist.co/terms"
    },
    {
        name: "Terms & Privacy",
        url: "https://anilist.co/terms"
    },
    {
        name: "Site Map",
        url: "https://anilist.co/sitemap/index.xml"
    }

]

export const CHARACTER_ANIME_FILTER: CharacterAnimeFilter[] = [
    {
        title: "Title",
        value: "TITLE_ENGLISH",
    },
    {
        title: "Popularity",
        value: "POPULARITY"
    },
    {
        title: "Average Score",
        value: "SCORE"
    },
    {
        title: "Favourites",
        value: "FAVOURITES"
    },
    {
        title: "Newest",
        value: "START_DATE_DESC"
    },
    {
        title: "Oldest",
        value: "START_DATE"
    }
];

export const NUMBER_TO_SEASON_MAP: Record<string, Season> = {
    9: "FALL",
    10: "FALL",
    11: "FALL",
    12: "WINTER",
    1: "WINTER",
    2: "WINTER",
    3: "SPRING",
    4: "SPRING",
    5: "SPRING",
    6: "SUMMER",
    7: "SUMMER",
    8: "SUMMER",
}

export const SEASONS_LIST = [
    {   
        label: "Winter",
        value: "WINTER"
    },
    {
        label: "Spring",
        value: "SPRING"
    },
    {
        label: "Summer",
        value: "SUMMER"
    },
    {
        label: "Fall",
        value: "FALL"
    }
]

export const SEASONS_LIST_VALUE_TO_LABEL_MAP = buildValueToLabelMap([...SEASONS_LIST])

export const ANIME_FORMAT_LIST = [
    {
        label: "TV Show",
        value: "TV"
    },
    {
        label: "Movie",
        value: "MOVIE"
    },
    {
        label: "TV Short",
        value: "TV_SHORT"
    },
    {
        label: "Special",
        value: "SPECIAL"
    },
    {
        label: "OVA",
        value: "OVA"
    },
    {
        label: "ONA",
        value: "ONA"
    },
    {
        label: "Music",
        value: "MUSIC"
    }
] as const;

export const ANIME_FORMAT_LIST_VALUE_TO_LABEL_MAP = buildValueToLabelMap([...ANIME_FORMAT_LIST]);

// export const  ANIME_FORMAT_LIST_VALUE_TO_LABEL_MAP: Record<typeof ANIME_FORMAT_LIST[number]["value"], string> = {
//     "TV": "TV Show",
//     "FINISHED": "Finished",
//     "NOT_YET_RELEASED": "Not Yet Aired",
//     "CANCELLED": "Cancelled" 
// }


export const AIRING_STATUS_LIST = [
    {
        label: "Airing",
        value: "RELEASING"
    },
    {
        label: "Finished",
        value: "FINISHED"
    },
    {
        label: "Not Yet Aired",
        value: "NOT_YET_RELEASED"
    },
    {
        label: "Cancelled",
        value: "CANCELLED"
    }
] as const

export const AIRING_STATUS_LIST_VALUE_TO_LABEL_MAP = buildValueToLabelMap([...AIRING_STATUS_LIST])


// export const AIRING_STATUS_LIST_VALUE_TO_LABEL_MAP: Record<typeof AIRING_STATUS_LIST[number]["value"], string> = {
//     "RELEASING": "Airing",
//     "FINISHED": "Finished",
//     "NOT_YET_RELEASED": "Not Yet Aired",
//     "CANCELLED": "Cancelled" 
// }


export const ANIME_LIST_SORT_OPTIONS = {
    POPULARITY_DESC: "POPULARITY_DESC",
    SCORE_DESC: "SCORE_DESC",
    TRENDING_DESC: "TRENDING_DESC",   
}

export const ANIME_YEARS_LIST_UNTIL_NEXT_YEAR = generateYearsUntilNextYear()


export type VIEW_TYPES = "SPREAD" | "SMALL_GRID" | "BIG_GRID";

export type ANIME_LIST_SORT_OPTIONS_TYPES = 
    "POPULARITY_DESC" 
    | "SCORE_DESC"
    | "TRENDING_DESC"
    | "TITLE_ENGLISH"
    | "POPULARITY_DESC"
    | "START_DATE_DESC"
    | "ID_DESC"


// const ANIME_FILTER_SEASONS = Array.from({length: })

export const appendFirstQueryParam = (key: string, value: string) => {
    return `?${key}=${value}`;
  };
  
export const appendSubsequentQueryParams = (key: string, value: string) => {
    return `&${key}=${value}`;
  };


 export const ANIME_FILTER_SORT_LIST: ListItem[] = [
    {
        label: "Title", 
        value: "TITLE_ENGLISH"
    },
    {
        label: "Popularity",
        value: "POPULARITY_DESC"
    },
    {
        label: "Average Score",
        value: "SCORE_DESC"
    },
    {
        label: "Trending",
        value: "TRENDING_DESC"
    },
    {
        label: "Favorites",
        value: "FAVOURITES_DESC"
    },
    {
        label: "Date Added",
        value: "ID_DESC"
    },
    {
        label: "Release Date",
        value: "START_DATE_DESC"
    },
 ];


 export const AnimeStatusBadgeNameColorMap: Record<string, {color: string, order: number}> = {
    Completed: {color: "rgb(104, 214, 57)", order: 0 },
    Planning: {color: "rgb(2, 169, 255)", order: 1 },
    Current: {color: "rgb(146, 86, 243)", order: 2},
    Paused: {color: "rgb(247, 121, 164)", order: 3},
    Dropped: {color: "rgb(232, 93, 117)", order: 4},
  };
  


export const ANIME_STATUS_OPTIONS_LIST = [
    {
        label: "Watching",
        value: "CURRENT"
    },
    {
        label: "Plan to watch",
        value: "PLANNING"
    },
    {
        label : "Completed",
        value: "COMPLETED"
    },
    {
        label: "Rewatching",
        value: "REPEATING"
    },
    {
        label: "Paused",
        value: "PAUSED"
    },
    {
        label: "Dropped",
        value: "DROPPED"
    }
]

export const ANIME_STATUS_OPTIONS_LIST_VALUE_LABEL_MAP: Record<string, string> = {
    CURRENT: "Watching",
    PLANNING: "Plan to watch",
    COMPLETED: "Completed",
    REPEATING: "Repeating",
    PAUSED: "Paused",
    DROPPED: "Dropped",
}

export const ANIME_STATUS_TEXT_MAP: Record<string, string> = {
    CURRENT: "Watching",
    PLANNING: "Planning",
    COMPLETED: "Completed",
    REPEATING: "Repeating",
    PAUSED: "Paused",
    DROPPED: "Dropped",
}