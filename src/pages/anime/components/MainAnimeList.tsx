import React from "react";
import { AnimeMain } from "../anime.type";
import AnimeListMainLayout from "./AnimeListMainLayout";
import MainAnimeListItem from "./MainAnimeListItem";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MainContainer from "../../../shared/components/MainContainer";
import MainAnimeHeader from "./MainAnimeHeader";

interface Props {
  animeList: AnimeMain[];
  title?: string;
  link?: string;
  hasRanking?: boolean;
  children?: React.ReactNode;
}

const MainAnimeList = ({
  title,
  link,
  animeList,
  hasRanking = false,
  children,
}: Props) => {
  return (
    <MainContainer>
      <Box
        sx={{
          padding: "1.5rem 0",
        }}
      >
        {title && link && <MainAnimeHeader title={title} link={link} />}
        <AnimeListMainLayout>
          {animeList.map((item, index) => (
            <MainAnimeListItem
              anime={item}
              key={item.id}
              rank={index + 1}
              hasRanking={hasRanking}
            />
          ))}
          {children}
        </AnimeListMainLayout>
      </Box>
    </MainContainer>
  );
};

export default MainAnimeList;
