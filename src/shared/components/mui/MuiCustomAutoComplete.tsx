import * as React from "react";
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import {
  AutocompleteGroupedOption,
  Box,
  Chip,
  UseAutocompleteProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { isArray } from "lodash";

const Label = styled("label")({
  display: "block",
  color: "rgb(81, 97, 112)",
  fontSize: "0.94rem",
  fontWeight: 600,
  marginBottom: "0.75rem",
});

const InputContainer = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  display: "flex",
  width: "180px",
  alignItems: "center",
  boxShadow:
    "rgba(103, 132, 187, 0.1) 0px 14px 30px 0px, rgba(103, 132, 187, 0.04) 0px 4px 4px 0px",
  borderRadius: "6px",
  overflow: "hidden",
}));

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  height: "40px",
  borderRadius: "6px",
  border: "none",
  padding: "0.81rem",
  color: "rgb(116, 136, 153)",
  fontSize: "0.81rem",
  outline: 0,

  "&::placeholder": {
    color: "",
    fontWeight: 600,
    fontSize: "0.81rem",
  },
  "&:focus::placeholder": {
    opacity: 0,
  },
  //   backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  //   color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const PopupButton = styled("button")(({ theme }) => ({
  all: "unset",
  alignSelf: "stretch",
  backgroundColor: "white",
  cursor: "pointer",
  paddingRight: "0.25rem",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: "100%",
  margin: "0.5rem 0 0",
  borderRadius: "4px",
  padding: "0.5rem",
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "white",
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 400,
  // border: "1px solid rgba(0,0,0,.25)",
  "& > li": {
    fontSize: "0.875rem",
    color: "rgb(110, 141, 162)",
    padding: "0.5rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
  },
  "& > li.Mui-focused": {
    color: "rgb(64, 178, 237)",
    backgroundColor: "rgba(237, 241, 245, 0.6)",
    cursor: "pointer",
  },
}));

const GroupListbox = styled("ul")(({ theme }) => ({
  width: "100%",
  margin: "0.5rem 0 0",
  borderRadius: "4px",
  padding: "0.5rem",
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "white",
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 400,
  // border: "1px solid rgba(0,0,0,.25)",
}));

const SecondaryList = styled("ul")(({ theme }) => ({
  // display: "block",
  "& > li": {
    fontSize: "0.875rem",
    color: "rgb(110, 141, 162)",
    padding: "0.5rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
  },
  "& > li.Mui-focused": {
    // backgroundColor: "#4a8df6",
    color: "rgb(64, 178, 237)",
    backgroundColor: "rgba(237, 241, 245, 0.6)",
    cursor: "pointer",
  },
}));

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
> {
  id: string;
  list: readonly T[];
  getOptionLabel: UseAutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    false
  >["getOptionLabel"];
  getOptionValue: (option: T) => React.ReactNode;
  multiple?: Multiple;
  label?: string;
  groupBy?: (option: T) => string;
  onChange?: UseAutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    false
  >["onChange"];
  disableClearable?: DisableClearable;
  controlledValue: UseAutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    false
  >["value"];
}

export default function MuiCustomAutoComplete<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false
>({
  id,
  list,
  getOptionLabel,
  getOptionValue,
  label,
  multiple,
  groupBy,
  onChange,
  controlledValue,
}: Props<T, Multiple, DisableClearable>) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
  } = useAutocomplete<T, Multiple, DisableClearable, false>({
    id: id,
    options: list,
    getOptionLabel: getOptionLabel,
    multiple: multiple,
    groupBy,
    onChange,
    value: controlledValue,
    filterOptions: (options, state) => {
      const newList = options.filter((item) =>
        state
          .getOptionLabel(item)
          .toLocaleLowerCase()
          .includes(state.inputValue.toLocaleLowerCase())
      );
      return newList;
    },
  });

  const optionIsSelected = (option: T) => {
    if (!value) {
      return false;
    }

    if (!multiple && getOptionLabel) {
      return getOptionLabel(option) === getOptionLabel(value as T);
    }

    if (getOptionLabel)
      return (value as T[])
        .map(getOptionLabel)
        .includes(getOptionLabel(option));
  };

  const AreOptionsSelectedAndIsModeMultiplee = value && multiple;

  const hasMoreThanOneItemSelected =
    AreOptionsSelectedAndIsModeMultiplee && (value as T[]).length > 1;

  const getSelectedValuesCount =
    AreOptionsSelectedAndIsModeMultiplee && `+ ${(value as T[]).length - 1}`;

  const shouldDisplayClearIcon = () => {
    if (isArray(value)) {
      return value.length > 0;
    }

    console.log("empty value", value);

    // if (typeof value === "number") {
    //   return value > 0;
    // }

    if (getOptionLabel) {
      return Boolean(getOptionLabel(value as T));
    }

    return false;
  };

  const noValueSelectedInNeitherModes =
    !shouldDisplayClearIcon() || (isArray(value) && value.length === 0);

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          borderRadius: "6px",
          // overflow: "hidden",
        }}
      >
        <Label {...getInputLabelProps()}>{label}</Label>
        <InputContainer>
          {AreOptionsSelectedAndIsModeMultiplee &&
            (value as T[]).slice(0, 1).map((item, index) => (
              <Chip
                {...getTagProps({ index })}
                sx={{
                  borderRadius: "4px",
                  color: "rgb(100, 115, 128)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  // marginRight: "0.1rem",
                  marginLeft: "0.25rem",
                  backgroundColor: "rgba(221, 230, 238, 0.8)",
                  "& .MuiChip-label": {
                    padding: "0 0.5rem 0 0.25rem",
                  },
                }}
                label={getOptionLabel && getOptionLabel(item)}
              />
            ))}
          {hasMoreThanOneItemSelected && (
            <Chip
              sx={{
                borderRadius: "6px",
                color: "rgb(100, 115, 128)",
                fontSize: "0.75rem",
                fontWeight: 500,
                marginRight: "0.25rem",
                marginLeft: "0.25rem",
                backgroundColor: "rgba(221, 230, 238, 0.8)",
                "& .MuiChip-label": {
                  padding: "0.35rem",
                },
              }}
              label={getSelectedValuesCount}
              onDelete={undefined}
            />
          )}
          <Input
            placeholder={noValueSelectedInNeitherModes ? "Any" : undefined}
            {...getInputProps()}
            sx={{
              padding: hasMoreThanOneItemSelected ? "0rem" : "0.81rem",
              color: !noValueSelectedInNeitherModes
                ? "rgb(64, 178, 237)"
                : "rgb(116, 136, 153)",
            }}
          />
          {shouldDisplayClearIcon() ? (
            <PopupButton {...getClearProps()}>
              <CloseIcon
                sx={{
                  fill: "rgb(173, 192, 210)",
                  transition: "0.2s ease",
                  fontSize: "1.25rem",
                  "&:hover": {
                    fill: "rgb(199, 213, 226)",
                  },
                }}
              />
            </PopupButton>
          ) : (
            <PopupButton {...getPopupIndicatorProps()}>
              <KeyboardArrowDownIcon
                sx={{
                  fill: "rgb(173, 192, 210)",
                  transition: "0.2s ease",
                  "&:hover": {
                    fill: "rgb(199, 213, 226)",
                  },
                }}
              />
            </PopupButton>
          )}
        </InputContainer>
      </Box>
      {groupedOptions.length > 0 && !groupBy ? (
        <Listbox {...getListboxProps()} sx={{ width: "180px" }}>
          {(groupedOptions as T[]).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              {getOptionValue(option)}
              {optionIsSelected(option) && (
                <CheckCircleIcon
                  sx={{
                    fontSize: "1.2rem",
                    fill: "rgb(64, 178, 237)",
                  }}
                />
              )}
            </li>
          ))}
        </Listbox>
      ) : null}
      {groupedOptions.length > 0 && groupBy ? (
        <GroupListbox sx={{ width: "180px" }} {...getListboxProps()}>
          {(groupedOptions as AutocompleteGroupedOption<T>[]).map(
            (option, index) => (
              <Box component="li" key={index}>
                <Box
                  sx={{
                    fontSize: "0.8125rem",
                    color: "rgb(92, 114, 138)",
                    fontWeight: 700,
                  }}
                >
                  {option.group}
                </Box>
                <SecondaryList sx={{ padding: "0.5rem 0.25em 0.35rem" }}>
                  {option.options.map((listItem, listItemIndex) => (
                    <Box
                      component="li"
                      {...getOptionProps({
                        option: listItem,
                        index: option.index + listItemIndex,
                      })}
                    >
                      {getOptionValue(listItem)}
                      {optionIsSelected(listItem) && (
                        <CheckCircleIcon
                          sx={{
                            fontSize: "1.2rem",
                            fill: "rgb(64, 178, 237)",
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </SecondaryList>
              </Box>
            )
          )}
        </GroupListbox>
      ) : null}
    </Box>
  );
}
