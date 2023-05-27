import { useQuery } from "@apollo/client";
import { AnimeDetails } from "../anime-details.type";
import { GET_ANIME_DETAILS } from "../queries/anime-details.query";

interface Props {
    id: number;
}

export const useGetAnimeDetails = ({
    id
}: Props) => {

    const { data, loading, error } = useQuery<AnimeDetails>(
        GET_ANIME_DETAILS,
        {
            variables: {
                id,
                type: "ANIME"
            }
        }
    )
    
    return {
        data,
        loading
    }
    
}