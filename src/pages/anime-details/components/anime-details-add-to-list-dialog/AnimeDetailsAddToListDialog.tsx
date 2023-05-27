import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AnimeDetailsAddToListDialogForm from "./AnimeDetailsAddToListDialogForm";
import { Dialog } from "@mui/material";
import AnimeDetailsAddToListDialogHeader from "./AnimeDetailsAddToListDialogHeader";
import { Dayjs } from "dayjs";
import { useLayoutEffect, useState } from "react";
import { usePostAnimeMediaListEntry } from "../../hooks/usePostAnimeMediaListEntry";
import { FuzzyDateInput } from "../../../../shared/shared.type";
import { MediaListEntry } from "../../anime-details.type";
import dayjs from "dayjs";
import { useDeleteAnimeMediaListEntry } from "../../hooks/useDeleteAnimeMediaListEntry";
import { useGetAnimeMediaListEntry } from "../../hooks/useGetAnimeMediaListEntry";

export type FormState = {
  status: string;
  score: string;
  episodeProgress: string;
  startDate: Dayjs | null;
  finishDate: Dayjs | null;
  totalRewatches: string;
  notes: string;
  isChecked: boolean;
};

const formatFuzzyInputDateToDayJs = (date: FuzzyDateInput) => {
  const dateAsString = `${date.year}/${date.month}/${date.day}`;

  return dayjs(dateAsString);
};

const ParseFuzzyDate = (date: Dayjs): FuzzyDateInput => {
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
  };
};

const initFormState = (mediaListEntry: MediaListEntry | null): FormState => {
  return {
    status: mediaListEntry?.status || "",
    score: mediaListEntry?.score.toString() || "",
    episodeProgress: mediaListEntry?.progress.toString() || "",
    startDate:
      (mediaListEntry &&
        mediaListEntry.startedAt.year &&
        formatFuzzyInputDateToDayJs(mediaListEntry.startedAt)) ||
      null,
    finishDate:
      (mediaListEntry &&
        mediaListEntry.completedAt.year &&
        formatFuzzyInputDateToDayJs(mediaListEntry.completedAt)) ||
      null,
    totalRewatches: mediaListEntry?.repeat.toString() || "",
    notes: mediaListEntry?.notes || "",
    isChecked: mediaListEntry?.private || false,
  };
};

interface Props {
  id: number;
  mediaId: number;
  isOpen: boolean;
  handleClose: () => void;
  animeInfo: {
    coverImage: string;
    title: string;
    bannerImage: string;
    isFavourite: boolean;
    episodes: number;
  };
  handleAnimeFavourite: (cb: () => void) => void;
  handleAnimeSave: () => void;
  mediaListEntry: MediaListEntry | null;
  isSuccessMessageSnackBarOpen: boolean;
  openSuccessMessageSnackBar: () => void;
  setSuccessMessageSnackBar: (message: string) => void;
  closeSuccessMessageSnackBar: () => void;
}

const AnimeDetailsAddToListDialog = ({
  id,
  mediaId,
  isOpen,
  handleClose,
  animeInfo,
  handleAnimeFavourite,
  handleAnimeSave,
  mediaListEntry,
  isSuccessMessageSnackBarOpen,
  closeSuccessMessageSnackBar,
  openSuccessMessageSnackBar,
  setSuccessMessageSnackBar,
}: Props) => {
  const { data: entryListData, loading: entryListLoading } =
    useGetAnimeMediaListEntry(mediaId);

  const entryData = entryListData?.Media.mediaListEntry || null;

  const [formState, setformState] = useState<FormState>(
    initFormState(entryData)
  );

  const [isDeleteEntryDialogOpen, setIsDeleteEntryDialogOpen] = useState(false);

  const { data, loading, AddAnimeToEntryList } = usePostAnimeMediaListEntry({
    mutationVariables: {
      mediaId,
      startedAt: {
        day: 0,
        year: 0,
        month: 0,
      },
      completedAt: {
        day: 0,
        year: 0,
        month: 0,
      },
      notes: "",
      progress: 0,
      repeat: 0,
      score: 0,
      status: "",
    },
  });

  const { data: deletedEntryData, DeleteAnimeEntry } =
    useDeleteAnimeMediaListEntry(id);

  const getEntryCompletedAtValue = () => {
    const currentValue = formState.finishDate;

    if (entryHasOldfinishDate()) {
      if (currentValue) {
        return ParseFuzzyDate(currentValue);
      }
      return null;
    }
    if (!entryHasOldfinishDate()) {
      if (!currentValue) {
        return undefined;
      }
      return ParseFuzzyDate(currentValue);
    }
  };

  const getEntryStartedAtValue = () => {
    const currentValue = formState.startDate;

    if (entryHasOldstartDate()) {
      if (currentValue) {
        return ParseFuzzyDate(currentValue);
      }
      return null;
    }
    if (!entryHasOldstartDate()) {
      if (!currentValue) {
        return undefined;
      }
      return ParseFuzzyDate(currentValue);
    }
  };
  const entryHasOldfinishDate = () => {
    if (mediaListEntry) {
      if (mediaListEntry.completedAt.year !== null) {
        return true;
      }
    }

    return false;
  };

  const entryHasOldstartDate = () => {
    if (mediaListEntry) {
      if (mediaListEntry.startedAt.year !== null) {
        return true;
      }
    }

    return false;
  };

  const openDeleteEntryDialog = () => {
    setIsDeleteEntryDialogOpen(true);
  };

  const closeDeleteEntryDialog = () => {
    setIsDeleteEntryDialogOpen(false);
  };

  const getEntrySavedMessage = () => {
    const message = `${animeInfo.title} was Added`;

    return message;
  };

  useLayoutEffect(() => {
    const updateEntryData = entryListData?.Media.mediaListEntry || null;

    if (updateEntryData) {
      setformState(initFormState(updateEntryData));
    }
  }, [entryListData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
        sx={{
          "& .MuiDialog-paper": {
            margin: 0,
            minWidth: "min(1200px, 100%)",
            borderRadius: "4px",
            overflow: "scroll",
            maxWidth: "auto",
            maxHeight: "auto",
          },
        }}
      >
        <AnimeDetailsAddToListDialogHeader
          handleAnimeFavourite={handleAnimeFavourite}
          openSuccessMessageSnackBar={openSuccessMessageSnackBar}
          setSuccessMessageSnackBar={setSuccessMessageSnackBar}
          handleClose={handleClose}
          animeInfo={animeInfo}
          handleAnimeSave={() => {
            AddAnimeToEntryList(
              {
                mutationVariables: {
                  status: formState.status || undefined,
                  mediaId,
                  private: formState.isChecked,
                  notes: formState.notes,
                  ...(formState.score && {
                    score: parseInt(formState.score),
                  }),
                  ...(formState.episodeProgress && {
                    progress: parseInt(formState.episodeProgress),
                  }),
                  ...(formState.totalRewatches && {
                    repeat: parseInt(formState.totalRewatches),
                  }),
                  startedAt: getEntryStartedAtValue(),
                  completedAt: getEntryCompletedAtValue(),
                },
              },
              () => {
                handleClose();
                openSuccessMessageSnackBar();
                setSuccessMessageSnackBar(getEntrySavedMessage());
              }
            );
          }}
        />

        <AnimeDetailsAddToListDialogForm
          animeInfo={animeInfo}
          formState={formState}
          setformState={setformState}
          handleDelete={() =>
            DeleteAnimeEntry(id, () => {
              handleClose();
              openSuccessMessageSnackBar();
              setSuccessMessageSnackBar("Entry was deleted");
            })
          }
          openDeleteEntryDialog={openDeleteEntryDialog}
          closeDelelteEntryDialog={closeDeleteEntryDialog}
          isDeleteEntryDialogOpen={isDeleteEntryDialogOpen}
          mediaEntryStatus={mediaListEntry?.status}
        />
      </Dialog>
    </LocalizationProvider>
  );
};

export default AnimeDetailsAddToListDialog;
