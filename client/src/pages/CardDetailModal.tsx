import React, { useState } from "react";
import { useModal } from "../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Card,
  useUpdateCardMutation,
  useCreateCardMutation,
  StatusInput,
} from "../generated/graphql";
import { useSnackbar } from "../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../context/Board";
import { Grid, TextField } from "@mui/material";

type CardModalProps = {
  card?: Card;
  status: StatusInput;
};

const CardDetailsModal = ({ card, status }: CardModalProps) => {
  const { modalShow, hideModal } = useModal();
  const [, updateCard] = useUpdateCardMutation();
  const [, createCard] = useCreateCardMutation();
  const { showSnackbar } = useSnackbar();
  const { cards, setCards, disabled, setDisabled } = useBoard();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [tasks, setTasks] = useState(card?.tasks || []);
  const [labels, setLabels] = useState(card?.labels || []);
  const [priority, setPriority] = useState(card?.priority);

  const saveChanges = async () => {
    setDisabled(true);
    hideModal();
    let response: any = {};
    if (card) {
      const res = await updateCard({
        id: card.id,
        title: title,
        description: description,
        tasks: card.tasks,
        labels: card.labels.map((l) => ({
          id: l.id,
          color: l.color,
          name: l.name,
        })),
        priority: card.priority,
      });
      response.errors = res.error;
      response.data = res.data.updateCard.card;
    } else {
      const res = await createCard({
        title: title,
        description: description,
        tasks: [],
        labels: [].map((l) => ({
          id: l.id,
          color: l.color,
          name: l.name,
        })),
        priority: 0,
        status: status,
      });
      response.errors = res.error;
      response.data = res.data.createCard.card;
    }
    if (!response.error) {
      const card = response.data as Card;
      setCards(cards.filter((c) => c.id != card.id).concat(card));
      const text = card ? "Changes saved correctly" : "Card created correctly";
      showSnackbar({
        text: text,
        actionChildren: <CheckCircleIcon style={{ color: "#23ae23" }} />,
      });
    } else {
      showSnackbar({
        text: "There was an error saving your changes",
        actionChildren: <ErrorIcon style={{ color: "#e13333" }} />,
      });
    }
    setDisabled(false);
  };

  return (
    <Dialog
      open={modalShow}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Priority"
                variant="standard"
                value={priority}
                defaultValue={0}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  const n = Number.parseInt(e.currentTarget.value);
                  setPriority(Number.isNaN(n) ? 0 : n);
                }}
              />
            </Grid>
          </Grid>
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
