import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "0 2rem",
        "@media screen and (max-width: 700px)": {
          padding: "0 1.5rem",
        },
        "@media screen and (max-width: 500px)": {
          padding: "0 1rem",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default MainContainer;
