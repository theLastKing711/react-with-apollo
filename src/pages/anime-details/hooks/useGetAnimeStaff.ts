import { useQuery } from "@apollo/client";
import { AnimeStaffResponse } from "../anime-details.type";
import { GET_ANIME_STAFF } from "../queries/anime-details.query";

interface Props {
  id: number;
}

export const useGetAnimeStaff = ({ id }: Props) => {
  const { data, loading, error } = useQuery<AnimeStaffResponse>(
    GET_ANIME_STAFF,
    {
      variables: {
        id,
        type: "ANIME",
      },
    }
  );

  return {
    data,
    loading,
  };
};
