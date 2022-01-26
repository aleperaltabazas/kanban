import React from "react";
import { useModal } from "../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "../generated/graphql";
import { useSnackbar } from "../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../context/Board";

type CardModalProps = {
  card: Card;
};

const DeleteCardModal = ({ card }: CardModalProps) => {
  const { modalShow, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { setLoading, setCards, cards } = useBoard();
  const [, deleteCard] = useDeleteCardMutation();

  const handleDelete = async () => {
    hideModal();
    setLoading(true);
    const response = await deleteCard({ id: card.id });

    if (response.error) {
      showSnackbar({ text: "There was an error deleting the card" });
    } else {
      setCards(cards.filter((c) => c.id != card.id));
    }
    setLoading(false);
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
          Are you sure you want to delete this card?
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

export default DeleteCardModal;
