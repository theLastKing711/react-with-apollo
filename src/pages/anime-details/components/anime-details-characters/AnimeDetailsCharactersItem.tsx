import { Box } from "@mui/material";
import {
  AnimeCharactersEdgesNode,
  AnimeDetailsOverviewCharacterEdgesNode,
} from "../../anime-details.type";
import { Link } from "react-router-dom";

interface Props {
  character: AnimeDetailsOverviewCharacterEdgesNode;
}

const charactersUrl = "";

const AnimeDetailsCharactersItem = ({ character }: Props) => {
  console.log("characterss", character);

  const getCharacterUrl = () => {
    const characterDetailsUrl = `${charactersUrl}/${character.node.id}`;

    return characterDetailsUrl;
  };

  return (
    <Box
      component="article"
      sx={{
        borderRadius: "2px",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "60px 1fr 1fr 60px",
          overFlow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", paddingTop: "130%" }}>
          <Link to={getCharacterUrl()}>
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
              alt="character's cover image"
              component="img"
              src={character.node.image.medium || ""}
            ></Box>
          </Link>
        </Box>
        <Link
          to={getCharacterUrl()}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0.5rem",
            backgroundColor: "white",
            textAlign: "left",
          }}
        >
          <Box sx={{ fontSize: "0.75rem", color: "rgb(61, 180, 242)" }}>
            {character.node.name.full}
          </Box>
          <Box sx={{ fontSize: "0.6875rem", color: "rgb(146, 153, 161)" }}>
            {character.role}
          </Box>
        </Link>
        {character.voiceActors.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "0.5rem",
              backgroundColor: "white",
              textAlign: "right",
            }}
          >
            <Box sx={{ fontSize: "0.75rem", color: "rgb(61, 180, 242)" }}>
              {character.voiceActors[0].name.full}
            </Box>
            <Box sx={{ fontSize: "0.6875rem", color: "rgb(146, 153, 161)" }}>
              {character.voiceActors[0].languageV2}
            </Box>
          </Box>
        )}
        {character.voiceActors.length > 0 && (
          <Box sx={{ position: "relative", paddingTop: "130%" }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="character's voice actor cover image"
              component="img"
              src={character.voiceActors[0].image?.medium || ""}
            ></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AnimeDetailsCharactersItem;
