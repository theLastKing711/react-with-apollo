import { Box, Skeleton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

const CharacterCoverList = () => {
  const placeHolderList = Array.from({ length: 20 }, (_, i) => {
    return i;
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Skeleton variant="circular" width={51} height={51} />
        <Skeleton variant="circular" width={51} height={51} />
      </Box>
      <Skeleton
        variant="rectangular"
        height={43.25}
        sx={{ marginBottom: "1rem" }}
      />
      <Grid2 container spacing={2} sx={{ marginBottom: "2rem" }}>
        {placeHolderList.map((item) => (
          <Grid2 xs={6} sm={3} md={2} lg={2} key={item}>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "140%",
                marginBottom: "0.5rem",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: "4px",
                  height: "100%",
                  width: "100%",
                }}
              ></Skeleton>
            </Box>

            <Typography component="h5">
              <Skeleton />
            </Typography>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default CharacterCoverList;
