import React, { useState } from "react";
import { useModal } from "../../context/Modal";
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
  Label,
} from "../../generated/graphql";
import { useSnackbar } from "../../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../../context/Board";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { makeStyles } from "@mui/styles";
import baseStyles from "../../styles";
import classnames from "classnames";
import { Formik, FormikErrors } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { isTooDark } from "../../functions/color";

type CardDetailModalProps = {
  card?: Card;
  status: StatusInput;
};

const useStyles = makeStyles({
  ...baseStyles,
  labelChip: {
    paddingTop: "1px",
    paddingBottom: "1px",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: "7px",
  },
});

const CardDetailModal = ({ card, status }: CardDetailModalProps) => {
  const classes = useStyles();
  const { modalShow, hideModal } = useModal();
  const [, updateCard] = useUpdateCardMutation();
  const [, createCard] = useCreateCardMutation();
  const { showSnackbar } = useSnackbar();
  const { cards, setCards, board, setDisabled, labels } = useBoard();
  const [autofocusTarget, setAutofocusTarget] = useState<number | undefined>();
  const [labelAutocomplete, setLabelAutocomplete] = useState("");

  const saveChanges = async (values: {
    title: string;
    description: string;
    priority: number;
    tasks: Task[];
    labels: Label[];
  }) => {
    setDisabled(true);
    hideModal();

    let response: any = {};

    if (card) {
      const res = await updateCard({
        id: card.id,
        title: values.title,
        description: values.description,
        tasks: values.tasks.map((t) => ({
          description: t.description,
          completed: t.completed,
          priority: t.priority,
        })),
        labels: values.labels.map((l) => ({
          id: l.id,
          color: l.color,
          name: l.name,
        })),
        priority: values.priority,
      });
      response.errors = res.error;
      response.data = res.data.updateCard.card;
    } else {
      const res = await createCard({
        boardId: board.id,
        title: values.title,
        description: values.description,
        tasks: values.tasks.map((t) => ({
          description: t.description,
          completed: t.completed,
          priority: t.priority,
        })),
        labels: values.labels.map((l) => ({
          id: l.id,
          color: l.color,
          name: l.name,
        })),
        priority: values.priority,
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
      <Formik
        initialValues={{
          title: card?.title,
          description: card?.description,
          priority: card?.priority?.toString(),
          tasks: card?.tasks || [],
          labels: card?.labels || [],
        }}
        validate={(values) => {
          const errors: Partial<typeof values> = {};

          if (!values.title) {
            errors.title = "Title is required";
          }

          if (!values.priority) {
            errors.priority = "Priority is required";
          } else if (!values.priority.match(/^\d+$/)) {
            errors.priority = "Priority must be a (positive) number";
          }

          values.tasks.forEach((task, i) => {
            if (!task.description) {
              if (!errors.tasks) {
                errors.tasks = Array(values.tasks.length).fill(
                  undefined as Task
                );
              }

              errors.tasks[i] = {
                description: "Task description is required",
              } as Task;
            }
          });

          return errors;
        }}
        onSubmit={(values) => {
          saveChanges({
            title: values.title,
            description: values.description,
            priority: Number.parseInt(values.priority),
            tasks: values.tasks,
            labels: values.labels,
          });
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
        }) => {
          const handleNewTask = () => {
            setAutofocusTarget(values.tasks.length);
            setValues({
              ...values,
              tasks: values.tasks.concat({
                description: "",
                priority: 0,
                completed: false,
              } as Task),
            });
          };

          const updateTask = (
            taskIndex: number,
            update: ((task: Task) => Partial<Task>) | Partial<Task>
          ) => {
            const updateFn: (t: Task) => Partial<Task> =
              typeof update == typeof Function
                ? (update as (task: Task) => Partial<Task>)
                : () => update as Partial<Task>;
            setValues({
              ...values,
              tasks: values.tasks.map((t, i) =>
                i == taskIndex ? { ...t, ...updateFn(t) } : t
              ),
            });
          };

          const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
          const checkedIcon = <CheckBoxIcon fontSize="small" />;

          return (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Title</Typography>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.title != undefined}
                        helperText={errors.title}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Description</Typography>
                      <TextField
                        fullWidth
                        name="description"
                        variant="standard"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Priority</Typography>
                      <TextField
                        fullWidth
                        name="priority"
                        variant="standard"
                        value={values.priority}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.priority}
                        error={errors.priority != undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Labels</Typography>
                      <Stack direction="row" spacing={1}>
                        {values.labels.map((l) => (
                          <Typography
                            variant="caption"
                            key={l.id}
                            style={{ backgroundColor: l.color }}
                            color={isTooDark(l.color) ? "white" : null}
                            className={classnames(
                              classes.labelChip,
                              "center",
                              "cursor-pointer"
                            )}
                            onClick={() =>
                              setValues({
                                ...values,
                                labels: values.labels.filter(
                                  (l2) => l.id != l2.id
                                ),
                              })
                            }
                          >
                            <span style={{ paddingRight: "5px" }}>
                              {l.name}{" "}
                            </span>
                            <CloseIcon fontSize="inherit" />
                          </Typography>
                        ))}
                      </Stack>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={labels}
                        value={null}
                        getOptionLabel={(l) => l.name}
                        fullWidth
                        renderInput={(params) => (
                          <TextField fullWidth variant="standard" {...params} />
                        )}
                        disableCloseOnSelect
                        inputValue={labelAutocomplete}
                        onInputChange={(_, v) => setLabelAutocomplete(v)}
                        onChange={(_, label) => {
                          if ((label as Label).id) {
                            setValues({
                              ...values,
                              labels: values.labels.some(
                                (l) => l.id == (label as Label).id
                              )
                                ? values.labels.filter(
                                    (l) => l.id != (label as Label).id
                                  )
                                : values.labels.concat(label as Label),
                            });
                            setLabelAutocomplete("");
                          }
                        }}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={values.labels.some(
                                (l) => l.id == option.id
                              )}
                            />
                            {option.name}
                          </li>
                        )}
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
                        {values.tasks.map((t, idx) => (
                          <ListItem
                            key={idx}
                            disablePadding
                            sx={{ width: "100%" }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={() => {}}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={t.completed}
                                  tabIndex={-1}
                                  disableRipple
                                  onChange={() =>
                                    updateTask(idx, (t) => ({
                                      completed: !t.completed,
                                    }))
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <TextField
                                    autoFocus={autofocusTarget == idx}
                                    onFocus={() =>
                                      setAutofocusTarget(undefined)
                                    }
                                    fullWidth
                                    variant="standard"
                                    value={t.description}
                                    helperText={
                                      errors.tasks != undefined &&
                                      errors.tasks[idx] != undefined &&
                                      (errors.tasks[idx] as FormikErrors<Task>)
                                        .description
                                    }
                                    error={
                                      errors.tasks != undefined &&
                                      errors.tasks[idx] != undefined
                                    }
                                    onChange={(e) =>
                                      updateTask(idx, {
                                        description: e.currentTarget.value,
                                      })
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
                <Button
                  onClick={() => handleSubmit()}
                  autoFocus
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default CardDetailModal;
