import { Box, Paper, Skeleton } from "@mui/material";

interface Props {
  hasRanking?: boolean;
}

const TopAnimeSpreadItemCover = ({ hasRanking = true }: Props) => {
  return (
    <Box sx={{ display: "flex", marginBottom: "1.5rem" }}>
      {hasRanking && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "0 0 100px",
            color: "rgb(139, 160, 178)",
            fontSize: "1.5rem",
          }}
        ></Box>
      )}

      <Paper
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          flex: 1,
        }}
      >
        <Box sx={{ width: "2.75rem", marginRight: "0.75rem" }}>
          <Skeleton
            width={44}
            height={61}
            variant="rectangular"
            sx={{
              borderRadius: "2px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ flex: "1 0", marginRight: "1rem" }}>
          <Skeleton variant="rectangular" height={10} width={100}></Skeleton>
        </Box>
        <Box sx={{ flex: "0 0 155px", display: "flex" }}>
          <Skeleton variant="rectangular" height={10} width={65}></Skeleton>
        </Box>
        <Box sx={{ flex: "0 0 120px" }}>
          <Skeleton variant="rectangular" height={10} width={65}></Skeleton>
        </Box>
        <Box sx={{ flex: "0 0 135px" }}>
          <Skeleton variant="rectangular" height={10} width={65}></Skeleton>
        </Box>
      </Paper>
    </Box>
  );
};

export default TopAnimeSpreadItemCover;
