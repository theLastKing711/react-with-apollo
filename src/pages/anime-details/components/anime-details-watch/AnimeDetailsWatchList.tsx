import React from "react";
import { AnimeStreamingEpisodes } from "../../anime-details.type";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  animeWatchList: AnimeStreamingEpisodes[];
}

const AnimeDetailsWatchList = ({ animeWatchList }: Props) => {
  return (
    <Box sx={{ borderRadius: "4px" }}>
      <Grid container spacing={2}>
        {animeWatchList.map((item, index) => (
          <Grid item xs={6} md={3} lg={3} key={index}>
            <Link
              to={item.url}
              style={{
                height: "100px",
                position: "relative",
                display: "block",
                overflow: "hidden",
                borderRadius: "4px",
              }}
              target="_blank"
            >
              <Box
                component="img"
                sx={{
                  position: "absolute",
                  content: "''",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                src={item.thumbnail}
              />
              <Box
                sx={{
                  position: "absolute",
                  content: "''",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  padding: "0.5rem",
                  color: "rgba(237, 241, 245, 0.91)",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundColor: "rgba(31, 38, 49, 0.7)",
                }}
              >
                {item.title}
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnimeDetailsWatchList;
