import {
  AIRING_STATUS_LIST_VALUE_TO_LABEL_MAP,
  ANIME_FORMAT_LIST_VALUE_TO_LABEL_MAP,
  SEASONS_LIST_VALUE_TO_LABEL_MAP,
} from "../../../shared/shared.constants";
import { AnimeTagFilterItem } from "../../anime/anime.type";
import { Box, Chip, ChipProps, IconButton } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

interface Props {
  tags: AnimeTagFilterItem[];
  onTagClicked: (tag: AnimeTagFilterItem) => void;
  onResetTagClicked: () => void;
}

const mapTagValueToValue = (tag: AnimeTagFilterItem) => {
  let mappedValue: string = "";

  switch (tag.key) {
    case "season":
      mappedValue = SEASONS_LIST_VALUE_TO_LABEL_MAP[tag.value];
      break;
    case "format_in":
      mappedValue = ANIME_FORMAT_LIST_VALUE_TO_LABEL_MAP[tag.value];
      break;
    case "status":
      mappedValue = AIRING_STATUS_LIST_VALUE_TO_LABEL_MAP[tag.value];
      break;
    default:
      mappedValue = tag.value;
  }

  return mappedValue;
};

const StyledChip = (props: ChipProps) => (
  <Chip
    sx={{
      color: "white",
      backgroundColor: "rgb(61, 180, 242)",
      borderRadius: "6px",
      marginRight: "0.5rem",
      fontSize: "0.8125rem",
      padding: "0rem",
      "&:hover": {
        backgroundColor: "rgb(61, 180, 242)",
      },
      marginBottom: "1rem",
    }}
    {...props}
  />
);

const StyledDangerChip = (props: ChipProps) => (
  <Chip
    sx={{
      color: "white",
      backgroundColor: "red",
      borderRadius: "6px",
      marginRight: "0.5rem",
      fontSize: "0.8125rem",
      padding: "0rem",
      "&:hover": {
        backgroundColor: "red",
      },
      marginBottom: "1rem",
    }}
    {...props}
  />
);

const AnimeFilterTagList = ({
  tags,
  onTagClicked,
  onResetTagClicked,
}: Props) => {
  const isMoreThanOneTagSelected = () => {
    return tags.length > 1;
  };

  const areTagsEmpty = () => {
    return tags.length === 0;
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        // flexWrap: "nowrap",
        // maxHeight: "32px",
      }}
    >
      {!areTagsEmpty() && (
        <IconButton
          disableRipple
          sx={{
            marginRight: "0.25rem",
            cursor: "default",
            alignSelf: "flex-start",
          }}
        >
          <LocalOfferIcon
            sx={{
              fill: `rgb(116, 136, 153)`,
              fontSize: "1.5rem",
            }}
            key={-1}
          />
        </IconButton>
      )}

      {tags.map((tag, index) => (
        <StyledChip
          key={index}
          label={mapTagValueToValue(tag)}
          onClick={(e) => onTagClicked(tag)}
        />
      ))}
      {isMoreThanOneTagSelected() && (
        <StyledDangerChip
          key={-2}
          label="clear all"
          onClick={onResetTagClicked}
        />
      )}
    </Box>
  );
};

export default AnimeFilterTagList;
