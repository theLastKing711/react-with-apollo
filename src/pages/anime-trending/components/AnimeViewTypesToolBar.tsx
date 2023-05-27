import { Box, IconButton } from "@mui/material";
import React from "react";
import MainContainer from "../../../shared/components/MainContainer";
import { VIEW_TYPES } from "../../../shared/shared.constants";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AppsIcon from "@mui/icons-material/Apps";
import { AnimeTagFilterItem } from "../../anime/anime.type";
import AnimeFilterTagList from "./AnimeFilterTagList";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AnimeSortFilter, { AnimeSortFilterProps } from "./AnimeSortFilter";

interface Props {
  isViewActive: (view: VIEW_TYPES) => boolean;
  setViewType: (view: VIEW_TYPES) => void;
  shouldDisplaySpreadViewOption: boolean;
  tagsList: AnimeTagFilterItem[];
  onTagClicked: (tag: AnimeTagFilterItem) => void;
  onResetTagClicked: () => void;
  animeSortFilterProps: AnimeSortFilterProps;
}

const AnimeViewTypesToolBar = ({
  isViewActive,
  setViewType,
  shouldDisplaySpreadViewOption,
  tagsList,
  onTagClicked,
  onResetTagClicked,
  animeSortFilterProps,
}: Props) => {
  return (
    <MainContainer>
      <Box
        sx={{
          display: "flex",
          // flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem 0 0rem",
        }}
      >
        <Box>
          <AnimeFilterTagList
            tags={tagsList}
            onTagClicked={onTagClicked}
            onResetTagClicked={onResetTagClicked}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <AnimeSortFilter {...animeSortFilterProps} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "rgb(116, 136, 153)",
            }}
          >
            |
          </Box>
          <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
            <IconButton onClick={() => setViewType("BIG_GRID")} disableRipple>
              <ViewModuleIcon
                sx={{
                  fill: `${
                    isViewActive("BIG_GRID")
                      ? "rgb(160, 177, 197)"
                      : "rgb(116, 136, 153)"
                  }`,
                  fontSize: "2rem",
                  "&:hover": {
                    fill: "rgb(160, 177, 197)",
                    cursor: "pointer",
                  },
                }}
              />
            </IconButton>
            <IconButton onClick={() => setViewType("SMALL_GRID")} disableRipple>
              <AppsIcon
                sx={{
                  fill: `${
                    isViewActive("SMALL_GRID")
                      ? "rgb(160, 177, 197)"
                      : "rgb(116, 136, 153)"
                  }`,
                  fontSize: "2rem",
                  "&:hover": {
                    fill: "rgb(160, 177, 197)",
                    cursor: "pointer",
                  },
                }}
              />
            </IconButton>
            {shouldDisplaySpreadViewOption && (
              <IconButton onClick={() => setViewType("SPREAD")} disableRipple>
                <ViewListIcon
                  sx={{
                    fill: `${
                      isViewActive("SPREAD")
                        ? "rgb(160, 177, 197)"
                        : "rgb(116, 136, 153)"
                    }`,
                    fontSize: "2rem",
                    "&:hover": {
                      fill: "rgb(160, 177, 197)",
                      cursor: "pointer",
                    },
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default AnimeViewTypesToolBar;
