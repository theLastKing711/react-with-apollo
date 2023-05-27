import { Box } from "@mui/material";
import { AnimeStaffEdgeNode } from "../../anime-details.type";

interface Props {
  staffDetails: AnimeStaffEdgeNode;
}

const AnimeDetailsStaffItem = ({ staffDetails }: Props) => {
  return (
    <Box component="article" sx={{ borderRadius: "2px", overflow: "hidden" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "55px 1fr" }}>
        <Box sx={{ position: "relative", paddingTop: "130%" }}>
          <Box
            sx={{
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            alt="staff's cover image"
            component="img"
            src={staffDetails.node.image.medium || ""}
          ></Box>
        </Box>
        <Box
          sx={{
            padding: "0.5rem",
            backgoundColor: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ fontSize: "0.75rem", color: "rgb(61, 180, 242)" }}>
            {staffDetails.node.name.full}
          </Box>
          <Box sx={{ fontSize: "0.6875rem", color: "rgb(146, 153, 161)" }}>
            {staffDetails.role}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeDetailsStaffItem;
