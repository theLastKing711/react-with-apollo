import React from "react";
import { AnimeDetailsTag } from "../anime-details.type";
import { Box, Tooltip, Typography } from "@mui/material";

interface Props {
  tags: AnimeDetailsTag[];
}

const AnimeDetailsTagsList = ({ tags }: Props) => {
  return (
    <Box component="section" sx={{ borderRadius: "2px", marginTop: "1rem" }}>
      <Typography
        component="h2"
        sx={{
          color: "rgb(92, 114, 138)",
          fontSize: "0.875rem",
          marginBottom: "0.5rem",
        }}
      >
        Tags
      </Typography>
      <Box
        component="ul"
        sx={{
          "& > li:not(:last-child)": {
            marginBottom: "0.5rem",
          },
        }}
      >
        {tags.map((tag, index) => (
          <Box
            component="li"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: "0.5rem",
            }}
            key={index}
          >
            <Tooltip title={tag.description}>
              <Box sx={{ color: "rgb(61, 180, 242)", fontSize: "0.8125rem" }}>
                {tag.name}
              </Box>
            </Tooltip>
            <Box style={{ color: "rgb(146, 153, 161)", fontSize: "0.75rem" }}>
              {tag.rank}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnimeDetailsTagsList;
