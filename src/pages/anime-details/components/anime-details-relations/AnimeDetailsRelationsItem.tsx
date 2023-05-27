import { Box } from "@mui/material";
import { AnimeDetailRelationsItem } from "../../anime-details.type";
import { toUpperCaseFirstChar } from "../../../../shared/shared.util";

interface Props {
  animeRelationItem: AnimeDetailRelationsItem;
}
const AnimeDetailsRelationsItem = ({ animeRelationItem }: Props) => {
  return (
    <Box
      component="article"
      sx={{
        backgroundColor: "white",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "85px 1fr" }}>
        <Box sx={{ position: "relative", paddingTop: "145%" }}>
          <Box
            component="img"
            src={animeRelationItem.coverImage.medium}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: "0.75rem" }}
        >
          <Box
            sx={{
              color: "rgb(61, 180, 242)",
              fontSize: "0.75rem",
              fontWeight: 500,
              marginBottom: "0.25rem",
            }}
          >
            {toUpperCaseFirstChar(animeRelationItem.source)}
          </Box>
          <Box
            sx={{
              color: "rgb(92, 114, 138)",
              fontSize: "0.875rem",
              flex: 1,
            }}
          >
            {animeRelationItem.title.english}
          </Box>
          <Box
            sx={{
              color: "rgb(146, 153, 161)",
              fontSize: "0.75rem",
            }}
          >
            {toUpperCaseFirstChar(animeRelationItem.type)} ·{" "}
            {toUpperCaseFirstChar(animeRelationItem.status)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeDetailsRelationsItem;
