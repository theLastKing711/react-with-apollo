import { Box } from "@mui/material";

interface Props {
  imageUrl: string;
}

const AnimeDetailsBannerImage = ({ imageUrl }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        "@media screen and (max-width: 800px)": {
          height: "200px",
        },
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        sx={{ objectFit: "cover", height: "100%" }}
      />
      <Box
        sx={{
          position: "absolute",
          content: "''",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg,rgba(6, 13, 34,0) 40%,rgba(6,13, 34,.6))",
        }}
      ></Box>
    </Box>
  );
};

export default AnimeDetailsBannerImage;
