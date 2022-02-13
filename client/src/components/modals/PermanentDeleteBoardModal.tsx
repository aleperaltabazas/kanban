import React from "react";
import { useModal } from "../../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Board, useDeleteBoardMutation } from "../../generated/graphql";
import { useSnackbar } from "../../context/Snackbar";
import { useRecycleBin } from "../../context/RecycleBin";

type PermanentDeleteBoardModalProps = {
  board: Board;
};

const PermanentDeleteBoardModal = ({
  board,
}: PermanentDeleteBoardModalProps) => {
  const { modalShow, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { boards, setBoards } = useRecycleBin();
  const [, deleteBoard] = useDeleteBoardMutation();

  const handleDelete = async () => {
    hideModal();
    const response = await deleteBoard({ id: board.id });

    if (response.error) {
      showSnackbar({ text: "There was an error deleting the board" });
    } else {
      setBoards(boards.filter((c) => c.id != board.id));
    }
  };

  return (
    <Dialog
      open={modalShow}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{board.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to permanently delete this board? This action
          cannot be reversed
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermanentDeleteBoardModal;
