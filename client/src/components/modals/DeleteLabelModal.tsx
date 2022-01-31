import React from "react";
import { useModal } from "../../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Label, useDeleteLabelMutation } from "../../generated/graphql";
import { useSnackbar } from "../../context/Snackbar";
import { useBoard } from "../../context/Board";

type LabelModalProps = {
  label: Label;
};

const DeleteLabelModal = ({ label }: LabelModalProps) => {
  const { modalShow, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { cards, setCards, disabled, setDisabled, setLabels, labels } =
    useBoard();
  const [, deleteLabel] = useDeleteLabelMutation();

  const handleDelete = async () => {
    hideModal();
    setDisabled(true);
    const response = await deleteLabel({ id: label.id });

    if (response.error) {
      showSnackbar({ text: "There was an error deleting the label" });
    } else {
      setLabels(labels.filter((l) => l.id != label.id));
      setCards(
        cards.map((c) => ({
          ...c,
          labels: c.labels.filter((l) => l.id != label.id),
        }))
      );
    }
    setDisabled(false);
  };

  return (
    <Dialog
      open={modalShow}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{label.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this label?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={hideModal} color="primary">
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={handleDelete}
          autoFocus
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLabelModal;
