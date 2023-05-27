import { Box, Skeleton, Typography } from "@mui/material";
import AnimeListMainLayout from "../../anime/components/AnimeListMainLayout";
import MainContainer from "../../../shared/components/MainContainer";
import CharacterAnimeCoverListList from "./CharacterAnimeCoverListList";

interface Props {
  listCount?: number;
}

const CharacterAnimeCoverList = ({ listCount = 10 }: Props) => {
  return (
    <Box>
      <MainContainer>
        <AnimeListMainLayout>
          <CharacterAnimeCoverListList listCount={listCount} />
        </AnimeListMainLayout>
      </MainContainer>
    </Box>
  );
};

export default CharacterAnimeCoverList;
