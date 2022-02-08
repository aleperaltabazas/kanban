import React from "react";
import { useModal } from "../../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  useUpdateBoardMutation,
  useCreateBoardMutation,
  Board,
} from "../../generated/graphql";
import { useSnackbar } from "../../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useHome } from "../../context/Home";
import { useHistory } from "react-router";

type BoardDetailModalProps = {
  board?: Board;
};

type BoardValues = {
  title: string;
};

const BoardDetailModal = ({ board }: BoardDetailModalProps) => {
  const { modalShow, hideModal } = useModal();
  const [, updateBoard] = useUpdateBoardMutation();
  const [, createBoard] = useCreateBoardMutation();
  const { showSnackbar } = useSnackbar();
  const { boards, setBoards } = useHome();
  const history = useHistory();

  const saveChanges = async (values: BoardValues) => {
    hideModal();

    let response: any = {};

    if (board) {
      const res = await updateBoard({
        id: board.id,
        title: values.title,
      });
      response.errors = res.error;
      response.data = res.data.updateBoard.board;
    } else {
      const res = await createBoard({
        title: values.title,
      });
      response.errors = res.error;
      response.data = res.data.createBoard.board;
    }

    if (!response.error) {
      const board = response.data as Board;
      setBoards(boards.filter((l) => l.id != board.id).concat(board));

      const text = board
        ? "Changes saved correctly"
        : "Board created correctly";
      showSnackbar({
        text: text,
        actionChildren: <CheckCircleIcon style={{ color: "#23ae23" }} />,
      });
      history.push(`/boards/${board.id}`);
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
      aria-boardledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <Formik
        initialValues={{
          title: board?.title,
        }}
        validate={(values) => {
          const errors: Partial<typeof values> = {};

          if (!values.title) {
            errors.title = "Title is required";
          }

          return errors;
        }}
        onSubmit={(values) => {
          saveChanges({
            title: values.title,
          });
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Board title</Typography>
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

export default BoardDetailModal;
