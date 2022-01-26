import React from "react";
import { useModal } from "../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, useUpdateCardMutation } from "../generated/graphql";
import { useSnackbar } from "../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../context/Board";

type CardModalProps = {
  card: Card;
};

const CardDetailsModal = ({ card }: CardModalProps) => {
  const { modalShow, hideModal } = useModal();
  const [, updateCard] = useUpdateCardMutation();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useBoard();

  const saveChanges = async () => {
    setLoading(true);
    hideModal();
    const response = await updateCard({
      id: card.id,
      title: card.title,
      description: card.description,
      tasks: card.tasks,
      labels: card.labels.map((l) => ({
        id: l.id,
        color: l.color,
        name: l.name,
      })),
      priority: card.priority,
    });
    setLoading(false);
    if (!response.error) {
      showSnackbar({
        text: "Changes saved correctly!",
        actionChildren: <CheckCircleIcon style={{ color: "#23ae23" }} />,
      });
    } else {
      showSnackbar({
        text: "There was an error saving your changes",
        actionChildren: <ErrorIcon style={{ color: "#e13333" }} />,
      });
    }
  };

  return (
    <Dialog
      open={modalShow}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{card.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} color="error">
          Cancel
        </Button>
        <Button onClick={saveChanges} autoFocus color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetailsModal;
