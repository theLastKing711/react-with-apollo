import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AnimeListMainLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        "@media screen and (max-width: 1000px)": {
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "1.25rem",
        },
        "@media screen and (max-width: 700px)": {
          gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
          gap: "1rem",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AnimeListMainLayout;
