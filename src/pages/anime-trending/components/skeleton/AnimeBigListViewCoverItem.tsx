import { Box, Skeleton } from "@mui/material";
import React from "react";

const AnimeBigListViewCoverItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "0 1px 8px purple",
        borderRadius: "6px 6px 6px 6px",
      }}
    >
      <Box
        sx={{
          flex: "0 0 170px",
          "@media screen and (max-width: 500px)": {
            flex: "0 0 135px",
          },
        }}
      >
        <Box sx={{ position: "relative", paddingTop: "143.4%" }}>
          <Skeleton
            variant="rectangular"
            sx={{
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px 0 0 6px",
            }}
          ></Skeleton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          backgroundColor: "white",
          borderRadius: "0 6px 6px 0",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={25}
          width={120}
          sx={{ marginBottom: "1rem" }}
        ></Skeleton>
        <Skeleton
          height={20}
          width={80}
          sx={{ marginBottom: "0.5rem" }}
        ></Skeleton>
        <Skeleton
          height={20}
          width={80}
          sx={{ marginBottom: "0.5rem" }}
        ></Skeleton>
      </Box>
    </Box>
  );
};

export default AnimeBigListViewCoverItem;
