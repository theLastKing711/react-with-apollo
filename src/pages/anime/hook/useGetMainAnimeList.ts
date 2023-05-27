import { useQuery } from "@apollo/client";
import { AnimeListPage, AnimeMain } from "../anime.type";
import { GET_ANIME_LIST } from "../queries/anime.query";
import { ANIME_LIST_SORT_OPTIONS } from "../../../shared/shared.constants";

interface useGetCharacterProps {
    perPage?: number;
    search?: string;
    season: string;
    seasonYear: number;
    sort: keyof typeof ANIME_LIST_SORT_OPTIONS; 
}

export const useGetMainAnimeList = (
    {
        perPage = 6,
        search,
        sort,
        season,
        seasonYear,
    }: useGetCharacterProps
    ) => { 
        
    const { data, error, loading } = useQuery<AnimeListPage<AnimeMain>>(GET_ANIME_LIST, {
        variables: {
            perPage,
            sort,
            season,
            seasonYear
        }
    }) 

    return {
        data,
        error,
        loading,
    }
    
}