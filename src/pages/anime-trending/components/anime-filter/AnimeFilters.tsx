import { Search } from "@mui/icons-material";
import { Box, BoxProps, InputBase, InputBaseProps } from "@mui/material";
import MainContainer from "../../../../shared/components/MainContainer";

import { AnimeGenreItem } from "../../../anime/anime.type";
import { ListItem } from "../../../../shared/shared.type";
import MuiCustomAutoComplete from "../../../../shared/components/mui/MuiCustomAutoComplete";
import { useEffect } from "react";

const FilterAnimeSelectLabel = (props: BoxProps) => (
  <Box
    component="label"
    sx={{
      display: "block",
      color: "rgb(81, 97, 112)",
      fontSize: "0.94rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
    }}
  >
    {props.children}
  </Box>
);

const SearchInputFilter = (props: InputBaseProps) => (
  <InputBase
    id="search-text-field"
    sx={{
      flex: 1,
      backgroundColor: "white",
      padding: "0.5rem",
      borderRadius: "4px",
      width: "180px",
      height: "40px",
      boxShadow:
        "rgba(103, 132, 187, 0.1) 0px 14px 30px 0px, rgba(103, 132, 187, 0.04) 0px 4px 4px 0px",
    }}
    onChange={props.onChange}
    value={props.value}
    startAdornment={
      <Search
        fontSize="small"
        sx={{ marginRight: "0.25rem", color: "rgb(201, 215, 227)" }}
      />
    }
    {...props}
  />
);

interface Props {
  yearList: number[];
  seasonList: ListItem[];
  formatList: readonly ListItem[];
  airingStatusList: readonly ListItem[];
  genreList: AnimeGenreItem[];
  handleSearchChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleGenreChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: AnimeGenreItem[]
  ) => void;
  handleYearChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
  handleSeasonChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: ListItem | null
  ) => void;
  handleFormatChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: ListItem[]
  ) => void;
  handleAiringChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: ListItem | null
  ) => void;
  searchValue: string | undefined;
  genreValues: AnimeGenreItem[] | undefined;
  yearValue: number | undefined | null;
  seasonValue: ListItem | undefined;
  formatValue: ListItem[] | undefined;
  airingValue: ListItem | undefined;
}

const AnimeFilters = ({
  genreList,
  airingStatusList,
  formatList,
  seasonList,
  yearList,
  handleSearchChange,
  handleGenreChange,
  handleYearChange,
  handleSeasonChange,
  handleFormatChange,
  handleAiringChange,
  searchValue,
  genreValues,
  yearValue,
  seasonValue,
  formatValue,
  airingValue,
}: Props) => {
  useEffect(() => {
    return () => {
      console.log("destroyings");
    };
  }, []);

  console.log("season valvs", seasonValue);

  return (
    <MainContainer>
      <Box
        sx={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: "noWrap",
          overflow: "scroll",
          paddingBottom: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <Box>
          <FilterAnimeSelectLabel>Search</FilterAnimeSelectLabel>
          <SearchInputFilter
            value={searchValue}
            onChange={(e) => handleSearchChange(e)}
          />
        </Box>
        <MuiCustomAutoComplete
          id="genre-filter"
          label="Genres"
          list={genreList}
          multiple
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={(e, selectedItems) => handleGenreChange(e, selectedItems)}
          controlledValue={genreValues}
        />
        <MuiCustomAutoComplete
          id="year-filter"
          label="Year"
          list={yearList}
          getOptionLabel={(option) => (option ? option.toString() : "")}
          getOptionValue={(option) => option}
          onChange={(e, selectedYear) => handleYearChange(e, selectedYear)}
          controlledValue={yearValue}
        />
        <MuiCustomAutoComplete
          id="season-filter"
          label="Season"
          list={seasonList}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.label}
          onChange={(e, selectedItem) => handleSeasonChange(e, selectedItem)}
          controlledValue={seasonValue}
        />
        <MuiCustomAutoComplete
          id="format-filter"
          label="Format"
          list={formatList}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.label}
          multiple
          onChange={(e, selectedItem) => handleFormatChange(e, selectedItem)}
          controlledValue={formatValue}
        />
        <MuiCustomAutoComplete
          id="airing-filter"
          label="Airing Status"
          list={airingStatusList}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.label}
          onChange={(e, selectedItem) => handleAiringChange(e, selectedItem)}
          controlledValue={airingValue}
        />
      </Box>
    </MainContainer>
  );
};

export default AnimeFilters;
