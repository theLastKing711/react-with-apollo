import { Box, Skeleton, Typography } from "@mui/material";

interface Props {
  listCount?: number;
}

const CharacterAnimeCoverListList = ({ listCount = 10 }: Props) => {
  const animeSkeletonList = Array.from({ length: listCount }, (_, index) => {
    return index;
  });

  return (
    <>
      {animeSkeletonList.map((item, index) => (
        <Box key={index}>
          <Box sx={{ position: "relative", paddingTop: "143.47%" }}>
            <Skeleton
              variant="rectangular"
              key={index}
              sx={{
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                objectFit: "contain",
              }}
            ></Skeleton>
          </Box>

          <Typography sx={{ marginTop: "0.25rem", fontSize: "0.825rem" }}>
            <Skeleton variant="text" />
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default CharacterAnimeCoverListList;
