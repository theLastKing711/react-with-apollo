import { Box, Button, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import React from "react";
import { CharacterAnimeFilter } from "../character.type";
import { CHARACTER_ANIME_FILTER } from "../../../shared/shared.constants";

interface Props {
  sortFilter: CharacterAnimeFilter;
  isSortFilterOpen: boolean;
  handleSortFilterOpened: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSortFilterClosed: () => void;
  handleSortFilterSelected: (filter: CharacterAnimeFilter) => void;
  anchorEl: null | HTMLElement;
}

const CharacterAnimesFilter = ({
  isSortFilterOpen,
  handleSortFilterOpened,
  handleSortFilterClosed,
  handleSortFilterSelected,
  sortFilter,
  anchorEl,
}: Props) => {
  const isSortItemSelected = (item: CharacterAnimeFilter) => {
    return sortFilter.title == item.title;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "0 2rem",
        maxWidth: "1300px",
        margin: "3rem auto 0.25rem",
      }}
    >
      <Box>
        <Button
          id="basic-button"
          aria-controls={isSortFilterOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isSortFilterOpen ? "true" : undefined}
          onClick={handleSortFilterOpened}
        >
          <Box component="span" sx={{ fontSize: "0.825rem" }}>
            {sortFilter.title}
          </Box>
          <SortIcon
            sx={{
              marginLeft: "0.25rem",
            }}
          ></SortIcon>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isSortFilterOpen}
          onClose={handleSortFilterClosed}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {CHARACTER_ANIME_FILTER.map((item, index) => (
            <MenuItem
              value={item.value}
              key={index}
              selected={isSortItemSelected(item)}
              onClick={() => handleSortFilterSelected(item)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default CharacterAnimesFilter;
