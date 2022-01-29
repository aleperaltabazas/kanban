import React, { useEffect, useState } from "react";
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
  Task,
} from "../generated/graphql";
import { useSnackbar } from "../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../context/Board";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { makeStyles } from "@mui/styles";
import baseStyles from "../styles";
import classnames from "classnames";

type CardModalProps = {
  card?: Card;
  status: StatusInput;
};

const useStyles = makeStyles(baseStyles);

const CardDetailsModal = ({ card, status }: CardModalProps) => {
  const classes = useStyles();
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
  const [autofocusTarget, setAutofocusTarget] = useState<number | undefined>();

  useEffect(() => {
    return () => {
      setTitle(undefined);
      setDescription(undefined);
      setPriority(0);
      setTasks([]);
      setLabels([]);
    };
  }, []);

  const handleNewTask = () => {
    setAutofocusTarget(tasks.length);
    setTasks(
      tasks.concat({
        description: "",
        priority: 0,
        completed: false,
      } as Task)
    );
  };

  const saveChanges = async () => {
    setDisabled(true);
    hideModal();
    let response: any = {};
    if (card) {
      const res = await updateCard({
        id: card.id,
        title: title,
        description: description,
        tasks: tasks.map((t) => ({
          description: t.description,
          completed: t.completed,
          priority: t.priority,
        })),
        labels: labels.map((l) => ({
          id: l.id,
          color: l.color,
          name: l.name,
        })),
        priority: priority,
      });
      response.errors = res.error;
      response.data = res.data.updateCard.card;
    } else {
      const res = await createCard({
        title: title,
        description: description,
        tasks: tasks.map((t) => ({
          description: t.description,
          completed: t.completed,
          priority: t.priority,
        })),
        labels: labels.map((l) => ({
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
              <Typography variant="h6">Title</Typography>
              <TextField
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Description</Typography>
              <TextField
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Priority</Typography>
              <TextField
                fullWidth
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
            <Grid item xs={12}>
              <Typography variant="h6">Tasks</Typography>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {tasks.map((t, idx) => (
                  <ListItem key={idx} disablePadding sx={{ width: "100%" }}>
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={t.completed}
                          tabIndex={-1}
                          disableRipple
                          onChange={() =>
                            setTasks(
                              tasks.map((t, i) =>
                                i == idx
                                  ? {
                                      ...t,
                                      completed: !t.completed,
                                    }
                                  : t
                              )
                            )
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <TextField
                            autoFocus={autofocusTarget == idx}
                            onFocus={() => setAutofocusTarget(undefined)}
                            fullWidth
                            variant="standard"
                            value={t.description}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t, i) =>
                                  i == idx
                                    ? {
                                        ...t,
                                        description: e.currentTarget.value,
                                      }
                                    : t
                                )
                              )
                            }
                          />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                className={classnames(classes.textWhite, classes.mt1)}
                onClick={handleNewTask}
              >
                new task
              </Button>
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
