import { Box } from "@mui/material";
import { CharacterDetailsMediaNode } from "../character.type";
import { Link } from "react-router-dom";

interface Props {
  animeList: CharacterDetailsMediaNode[];
}

const CharacterAnimeList = ({ animeList }: Props) => {
  console.log("anime list", animeList);

  return (
    <Box>
      <Box
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "1rem 2rem 3rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            "@media screen and (max-width: 1000px)": {
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "1.25rem",
            },
            "@media screen and (max-width: 700px)": {
              gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
              gap: "1rem",
            },
          }}
        >
          {animeList.map((item, index) => (
            <Box key={item.id}>
              <Link
                style={{
                  position: "relative",
                  paddingTop: "143.47%",
                  display: "block",
                }}
                to={`/anime/${item.id}`}
              >
                <Box
                  component="img"
                  src={item.coverImage.large}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                ></Box>
              </Link>
              <Link
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.825rem",
                  display: "block",
                }}
                to={`/anime/${item.id}`}
              >
                {item.title.romaji}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterAnimeList;
