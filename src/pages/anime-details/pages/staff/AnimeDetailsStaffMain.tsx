import { Box } from "@mui/material";
import React from "react";
import { useGetAnimeStaff } from "../../hooks/useGetAnimeStaff";
import AnimeDetailsStaffList from "../../components/anime-details-staff/AnimeDetailsStaffList";
import { useLocation } from "react-router-dom";

const AnimeDetailsStaffMain = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading } = useGetAnimeStaff({ id: parseInt(id) });

  const staffList = data?.Media.staff.edges || [];

  return (
    <Box>
      <AnimeDetailsStaffList edges={staffList} />
    </Box>
  );
};

export default AnimeDetailsStaffMain;
