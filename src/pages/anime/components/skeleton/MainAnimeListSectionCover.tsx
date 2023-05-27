import { Box } from "@mui/material";
import MainContainer from "../../../../shared/components/MainContainer";
import CharacterAnimeCoverList from "../../../character/components/CharacterAnimeCoverList";
import MainAnimeHeader from "../MainAnimeHeader";

interface Props {
  listCount?: number;
  title?: string;
  link?: string;
}

const MainAnimeListSectionCover = ({ listCount, title, link }: Props) => {
  return (
    <Box sx={{ padding: "1.5rem 0" }}>
      <MainContainer>
        <MainAnimeHeader title={title} link={link} />
      </MainContainer>
      <CharacterAnimeCoverList listCount={listCount} />
    </Box>
  );
};

export default MainAnimeListSectionCover;
