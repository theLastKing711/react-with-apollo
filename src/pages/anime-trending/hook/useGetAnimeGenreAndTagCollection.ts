import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { GET_ANIME_GENRE_AND_TAG_COLLECTION } from '../queries/AnimeGenresAndTag';
import { AnimeGenreAndTagCollections } from './../../anime/anime.type';


export const useGetAnimeGenreAndTagCollections = () => {
  const { data, error, loading } = useQuery<AnimeGenreAndTagCollections>(
    GET_ANIME_GENRE_AND_TAG_COLLECTION,
  );

  return {
    data,
    loading,
    error
  };
};
