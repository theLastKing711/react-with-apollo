import { NativeSelect, NativeSelectProps } from "@mui/material";
import { ANIME_FILTER_SORT_LIST } from "../../../shared/shared.constants";
import SortIcon from "@mui/icons-material/Sort";
// const StyledSelect = styled("select")(({ theme }) => ({
//   backgroundColor: "transparent",
//   border: "none",
//   display: "flex",
//   width: "100px",
//   alignItems: "center",
//   overflow: "hidden",
//   MozAppearance: "none",
//   WebkitAppearance: "none",
//   appearance: "none",
//   "&::ms-expand": {
//     display: "none",
//   },
// }));

const StyledSelect = (props: NativeSelectProps) => (
  <NativeSelect
    sx={{
      padding: "0px",
      color: "rgb(116, 136, 153)",
      "&:hover": {
        color: "rgb(134, 155, 173)",
        ".MuiSvgIcon-root": {
          fill: "rgb(156, 176, 193)",
        },
      },
      "&:focus": {
        backgroundColor: "red",
      },
      "&::before, &::after": {
        all: "unset",
      },
      fontSize: "0.8125",
      fontWeight: 600,
      //   "&::before",: {
      //     all: "unset",
      //   },
      "& .MuiNativeSelect-icon": {
        display: "none",
      },
      "& .MuiNativeSelect-select": {
        padding: "0",
        ":focus": {
          backgroundColor: "transparent",
        },
        "> option": {
          color: "white !important",
        },
      },
    }}
    {...props}
  />
);

export interface AnimeSortFilterProps {
  onSortValueChange: (value: string) => void;
  sortValue: string;
}

const AnimeSortFilter = ({
  sortValue,
  onSortValueChange,
}: AnimeSortFilterProps) => {
  return (
    <>
      <StyledSelect
        startAdornment={
          <SortIcon sx={{ cursor: "", padding: "0.35rem" }} fontSize="large" />
        }
        IconComponent={undefined}
        id="demo-simple-select"
        value={sortValue}
        onChange={(e) => {
          const newValue = e.target.value;
          console.log("new value", newValue);
          onSortValueChange(newValue);
        }}
      >
        {ANIME_FILTER_SORT_LIST.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default AnimeSortFilter;
