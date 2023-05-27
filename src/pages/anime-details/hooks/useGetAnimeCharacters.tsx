import { useQuery } from "@apollo/client";
import { AnimeCharactersResponse } from "../anime-details.type";
import { GET_ANIME_CHARACTERS } from "../queries/anime-details.query";

interface Props {
  id: number;
}

export const useGetAnimeCharacters = ({ id }: Props) => {
  const { data, loading, error } = useQuery<AnimeCharactersResponse>(
    GET_ANIME_CHARACTERS,
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
