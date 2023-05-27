import { Box } from "@mui/material";
import AnimeDetailsSecondaryTitle from "../AnimeDetailsSecondaryTitle";
import { AnimeStaffEdges } from "../../anime-details.type";
import AnimeDetailsStaffList from "./AnimeDetailsStaffList";

interface Props extends AnimeStaffEdges {}

const AnimeDetailsStaffSection = ({ edges }: Props) => {
  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AnimeDetailsSecondaryTitle>Staff</AnimeDetailsSecondaryTitle>
      <AnimeDetailsStaffList edges={edges} />
    </Box>
  );
};

export default AnimeDetailsStaffSection;
