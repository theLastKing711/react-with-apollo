import { Box } from "@mui/material";
import AnimeDetailsHighestRatingItem, {
  HighestRatingItemProps,
} from "./AnimeDetailsHighestRatingItem";

interface Props {
  highestRatingList: HighestRatingItemProps[];
}

const AnimeDetailsHighestRatingList = ({ highestRatingList }: Props) => {
  return (
    <Box component="article">
      <Box
        sx={{
          "& > *": {
            marginBottom: "1rem",
          },
        }}
      >
        {highestRatingList.map((item, index) => {
          return (
            <AnimeDetailsHighestRatingItem
              rankingItem={item.rankingItem}
              startIcon={item.startIcon}
              key={index}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AnimeDetailsHighestRatingList;
