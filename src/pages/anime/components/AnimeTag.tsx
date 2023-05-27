import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  color: string;
  backgroundColor: string;
  name: string;
}

const AnimeTag = ({ color, backgroundColor, name }: Props) => {
  const animeDetailsTagRoute = `/anime/search?genre_in=${name}`;

  return (
    <Link
      style={{
        borderRadius: "2000px",
        backgroundColor,
        color,
        padding: "0.35rem 0.7rem",
        fontSize: "0.65rem",
        fontWeight: 700,
      }}
      to={animeDetailsTagRoute}
    >
      {name}
    </Link>
  );
};

export default AnimeTag;
