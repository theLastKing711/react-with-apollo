import { Box } from "@mui/material";
import { AnimeDetailsRelationsNodes } from "../../anime-details.type";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import AnimeDetailsRelationsList from "./AnimeDetailsRelationsList";

export interface Props extends AnimeDetailsRelationsNodes {
  title: string;
}

const AnimeDetailsRelationsSection = ({ nodes, title }: Props) => {
  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>{title}</AnimeDetailsSecondaryTitle>
      <AnimeDetailsRelationsList nodes={nodes} />
    </Box>
  );
};

export default AnimeDetailsRelationsSection;
