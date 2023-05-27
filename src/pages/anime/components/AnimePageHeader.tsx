import React from "react";
import MainContainer from "../../../shared/components/MainContainer";
import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const AnimePageHeader = ({ children }: Props) => {
  return (
    <MainContainer>
      <Typography
        component="h1"
        sx={{
          fontWeight: 800,
          paddingBottom: "1.25rem",
          textTransform: "capitalize",
          fontSize: "1.75rem",
          color: "rgb(100, 115, 128)",
        }}
      >
        {children}
      </Typography>
    </MainContainer>
  );
};

export default AnimePageHeader;
