import { Box } from "@mui/material";
import React from "react";
import MainAnimeListSectionCover from "./MainAnimeListSectionCover";
import TopAnimeSpreadSectionCover from "./TopAnimeSpreadSectionCover";

interface Props {
  isTopAnimeInMainLayout: boolean;
}

const MainAnimeListPageCover = ({ isTopAnimeInMainLayout }: Props) => {
  return (
    <Box>
      <MainAnimeListSectionCover
        listCount={6}
        title="TRENDING NOW"
        link="trending"
      />
      <MainAnimeListSectionCover
        listCount={6}
        title="POPULAR THIS SEASON"
        link="this-season"
      />
      <MainAnimeListSectionCover
        listCount={6}
        title="POPULAR NEXT SEASON"
        link="next-season"
      />
      <MainAnimeListSectionCover
        listCount={6}
        title="ALL TIME POPULAR"
        link="poular"
      />
      <Box sx={{ marginTop: "1rem" }} />
      {!isTopAnimeInMainLayout ? (
        <TopAnimeSpreadSectionCover
          listCount={10}
          title="TOP 100 ANIME"
          link="top-100"
        />
      ) : (
        <MainAnimeListSectionCover
          listCount={10}
          title="TOP 100 ANIME"
          link="top-100"
        />
      )}
    </Box>
  );
};

export default MainAnimeListPageCover;
