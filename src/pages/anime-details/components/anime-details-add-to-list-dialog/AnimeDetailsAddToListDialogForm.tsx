import {
  Select,
  InputLabel,
  Box,
  Grid,
  FormControl,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import styled from "styled-components";
import { ANIME_STATUS_OPTIONS_LIST } from "../../../../shared/shared.constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import dayjs, { Dayjs } from "dayjs";
import { FormState } from "./AnimeDetailsAddToListDialog";
import DeleteAnimeEntryDialog from "./DeleteAnimeEntryDialog";

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "rgb(237, 241, 245)",
  "& .MuiSelect-select": {
    padding: "10px 32px 10px 10px",
    height: "1.4375rem",
    minHeight: "0px",
    color: "rgb(92, 114, 138)",
    fontSize: "0.8125rem",
  },
  border: "none",
  "& fieldset": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    fill: "rgb(192, 196, 204)",
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  "&.MuiInputLabel-root": {
    transform: "translate(0.8px, -18px) scale(0.75)",
    color: "rgba(122, 133, 143, 0.9)",
  },
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: "rgb(237, 241, 245)",
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    height: "23px",
    padding: "10px",
    fontSize: "0.8125rem",
    color: "rgb(92, 114, 138)",
    // "::place-holder": {},
  },

  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));

const StyledInput = styled("input")(({ theme }) => ({
  borderRadius: 4,
  color: "rgb(92, 114, 138)",
  position: "relative",
  backgroundColor: "rgb(237, 241, 245)",
  border: "0px",
  borderColor: "white",
  fontSize: "0.8125rem",
  width: "100%",
  padding: "10px 12px",
  height: "43px",
  outline: "none",
}));

const StyledTextArea = styled("textarea")(({ theme }) => ({
  borderRadius: 4,
  color: "rgb(92, 114, 138)",
  position: "relative",
  backgroundColor: "rgb(237, 241, 245)",
  border: "0px",
  borderColor: "white",
  fontSize: "0.8125rem",
  width: "100%",
  padding: "10px 12px",
  height: "43px",
  outline: "none",
}));

const MAX_SCORE_VALUE = 10;

interface Props {
  animeInfo: {
    coverImage: string;
    title: string;
    bannerImage: string;
    isFavourite: boolean;
    episodes: number;
  };
  formState: FormState;
  setformState: React.Dispatch<React.SetStateAction<FormState>>;
  handleDelete: () => void;
  isDeleteEntryDialogOpen: boolean;
  openDeleteEntryDialog: () => void;
  closeDelelteEntryDialog: () => void;
  mediaEntryStatus: string | undefined;
}

const AnimeDetailsAddToListDialogForm = ({
  animeInfo,
  formState,
  setformState,
  handleDelete,
  isDeleteEntryDialogOpen,
  closeDelelteEntryDialog,
  openDeleteEntryDialog,
  mediaEntryStatus,
}: Props) => {
  const MAX_NUMBER_OF_EPISODES = animeInfo.episodes;

  const updateFormValue = (
    key: keyof FormState,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setformState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const resetToMaxValueOnBlur = (
    key: keyof FormState,
    maxValue: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (parseInt(event.target.value) > maxValue) {
      setformState((prev) => ({ ...prev, [key]: maxValue.toString() }));
    }
  };

  const handleStartDateChange = (date: unknown) => {
    setformState((prev) => ({ ...prev, startDate: date as null | Dayjs }));
  };

  const handleEndDateChange = (date: unknown) => {
    setformState((prev) => ({ ...prev, finishDate: date as null | Dayjs }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "5.5rem 3rem",
        "@media screen and (max-width: 800px)": {
          padding: "5.5rem 1.5rem",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 120px",
          gap: "2rem",
          "@media screen and (max-width: 800px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Grid container rowSpacing={7} columnSpacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="status-select">
                Status
              </StyledInputLabel>
              <StyledSelect
                labelId="status-select"
                id="status-select"
                value={formState.status}
                onChange={(e) => {
                  console.log("status", e.target.value);
                  setformState((prev) => ({
                    ...prev,
                    status: e.target.value as string,
                  }));
                }}
                label="Status"
                IconComponent={KeyboardArrowDownIcon}
              >
                {ANIME_STATUS_OPTIONS_LIST.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="notes-input">Score</StyledInputLabel>
              <StyledInput
                type="number"
                id="notes-input"
                step={0.5}
                min={0}
                max={MAX_SCORE_VALUE}
                value={formState.score}
                onChange={(e) => updateFormValue("score", e)}
                onBlur={(e) =>
                  resetToMaxValueOnBlur("score", MAX_SCORE_VALUE, e)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="episode-progress-input">
                Episode Progress
              </StyledInputLabel>
              <StyledInput
                value={formState.episodeProgress}
                onChange={(e) => {
                  updateFormValue("episodeProgress", e);
                }}
                onBlur={(e) =>
                  resetToMaxValueOnBlur(
                    "episodeProgress",
                    MAX_NUMBER_OF_EPISODES,
                    e
                  )
                }
                type="number"
                id="episode-progress-input"
                min={5}
                max={MAX_NUMBER_OF_EPISODES}
                step={1}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="start-date-picker">
                Start Date
              </StyledInputLabel>
              <StyledDatePicker
                value={formState.startDate}
                onChange={(e) => handleStartDateChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="end-date-picker">
                End Date
              </StyledInputLabel>
              <StyledDatePicker
                value={formState.finishDate}
                onChange={(e) => handleEndDateChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="total-rewatches-input">
                Total Rewatches
              </StyledInputLabel>
              <StyledInput
                type="number"
                id="total-rewatches-input"
                value={formState.totalRewatches}
                onChange={(e) => updateFormValue("totalRewatches", e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <StyledInputLabel htmlFor="notes-input">Notes</StyledInputLabel>
              <StyledTextArea
                id="notes-input"
                value={formState.notes}
                onChange={(e) => updateFormValue("notes", e)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                value={formState.isChecked}
                checked={formState.isChecked}
                onChange={(e) =>
                  setformState((prev) => ({
                    ...prev,
                    isChecked: !prev.isChecked,
                  }))
                }
              />
            }
            label="Is Private"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontWeight: 400,
                fontSize: "0.75rem",
                color: "rgb(92, 114, 138)",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {mediaEntryStatus && (
          <Button
            variant="contained"
            color="error"
            onClick={openDeleteEntryDialog}
            sx={{
              fontSize: "0.75rem",
              borderRadius: "6px",
              boxShadow: "none",
              backgroundColor: "#EDF1F5",
              color: "rgb(232 93 117)",
              minWidth: "4.375rem",
              "&:hover": {
                color: "white",
              },
            }}
          >
            Delete
          </Button>
        )}
      </Box>
      <DeleteAnimeEntryDialog
        open={isDeleteEntryDialogOpen}
        handleClose={closeDelelteEntryDialog}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default AnimeDetailsAddToListDialogForm;
