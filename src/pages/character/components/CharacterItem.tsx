import { Box, Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Characters } from "../character.type";

interface Props extends Characters {
  isLoading: boolean;
}

const CharacterItem = ({ image, name, id, isFavourite, isLoading }: Props) => {
  return (
    <Link to={id.toString()} style={{ textDecoration: "none" }}>
      <Box
        component="article"
        sx={{
          height: "100%",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <></>
        ) : (
          // <Skeleton height={800} width={200} />
          <Box>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "140%",
                marginBottom: "0.75rem",
                boxShadow: "0 8px 10px grey",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
                src={image.medium}
                alt=""
              ></img>
            </Box>
            <Box
              component="p"
              sx={{
                color: "rgb(81, 97, 112)",
                fontSize: "0.9rem",
                "&:hover": {
                  color: "rgb(108, 127, 144)",
                },
              }}
            >
              {name.full}
            </Box>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default CharacterItem;
