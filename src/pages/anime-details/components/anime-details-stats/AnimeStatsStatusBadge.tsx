import { Box, Chip } from "@mui/material";

interface Props {
  color: string;
  text: string;
  count: number;
}

const AnimeStatsStatusBadge = ({ color, text, count }: Props) => {
  return (
    <Box>
      <Chip
        sx={{
          borderRadius: "6px",
          backgroundColor: color,
          color: "white",
          marginBottom: "0.5rem",
          fontSize: "0.875rem",
        }}
        label={text}
      />
      <Box sx={{ fontSize: "0.875rem", color: color, textAlign: "center" }}>
        {count}{" "}
        <Box
          component="span"
          sx={{ fontSize: "0.75rem", color: "rgba(122, 133, 143, 0.6)" }}
        >
          Users
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeStatsStatusBadge;
