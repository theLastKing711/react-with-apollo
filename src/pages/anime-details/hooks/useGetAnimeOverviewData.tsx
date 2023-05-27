import { useQuery } from "@apollo/client";
import { CharacterSort, StaffSort } from "../../character/character.type";
import { AnimeDetailsOverview } from "../anime-details.type";
import { GET_ANIME_OVERVIEW_DATA } from "../queries/anime-details.query";

interface Props {
  id: number;
  characterSort?: CharacterSort[];
  characterPerPage?: number;
  staffSort?: StaffSort[];
  staffPerPage?: number;
}

export const useGetAnimeOverviewData = ({
  id,
  characterSort = ["ID"],
  characterPerPage = 6,
  staffSort = ["RELEVANCE"],
  staffPerPage = 3,
}: Props) => {
  const { data, loading, error } = useQuery<AnimeDetailsOverview>(
    GET_ANIME_OVERVIEW_DATA,
    {
      variables: {
        type: "ANIME",
        id,
        characterSort,
        characterPerPage,
        staffSort,
        staffPerPage,
      },
    }
  );

  return {
    data,
    loading,
  };
};
