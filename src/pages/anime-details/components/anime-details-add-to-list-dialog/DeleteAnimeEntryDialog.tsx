import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteAnimeEntryDialog = ({ open, handleClose, handleDelete }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>Warning</Box>
        <IconButton
          disableRipple
          onClick={handleClose}
          sx={{
            padding: "0rem",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this list entry?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "rgb(241, 243, 247)",
            color: "rgb(92, 114, 138)",
            fontSize: "0.75rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgb(241, 243, 247)",
            },
          }}
          disableRipple
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          sx={{
            backgroundColor: "rgb(61, 180, 242)",
            color: "rgb(237, 241, 245)",
            fontSize: "0.75rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgb(61, 180, 242)",
            },
          }}
          disableRipple
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAnimeEntryDialog;
