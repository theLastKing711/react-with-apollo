import { Box } from "@mui/material";
import React from "react";
import AnimeDetailsCharactersList from "../../components/anime-details-characters/AnimeDetailsCharactersList";
import { useGetAnimeCharacters } from "../../hooks/useGetAnimeCharacters";
import { useLocation } from "react-router-dom";

const AnimeDetailsCharactersMain = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading } = useGetAnimeCharacters({ id: parseInt(id) });

  const charactersList = data?.Media.characters.edges || [];

  return (
    <Box>
      <AnimeDetailsCharactersList edges={charactersList} />
    </Box>
  );
};

export default AnimeDetailsCharactersMain;
