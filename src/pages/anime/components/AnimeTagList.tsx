import { Box, BoxProps } from "@mui/material";
import AnimeTag from "./AnimeTag";

interface Props {
  tags: string[];
  color: string;
  backgroundColor: string;
  maxHeight?: number;
  listStyles?: BoxProps["sx"];
}

const AnimeTagList = ({
  tags,
  color,
  backgroundColor,
  maxHeight,
  listStyles,
}: Props) => {
  const listStylesApply = listStyles || {};

  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        ...listStylesApply,
      }}
    >
      {tags.map((item, index) => (
        <AnimeTag
          key={item}
          backgroundColor={backgroundColor}
          color={color}
          name={item}
        />
      ))}
    </Box>
  );
};

export default AnimeTagList;
