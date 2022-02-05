import React from "react";
import { useModal } from "../../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  useUpdateLabelMutation,
  useCreateLabelMutation,
  Label,
} from "../../generated/graphql";
import { useSnackbar } from "../../context/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useBoard } from "../../context/Board";
import { Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { ChromePicker } from "react-color";

type LabelDetailModalProps = {
  label?: Label;
};

const LabelDetailModal = ({ label }: LabelDetailModalProps) => {
  const { modalShow, hideModal } = useModal();
  const [, updateLabel] = useUpdateLabelMutation();
  const [, createLabel] = useCreateLabelMutation();
  const { showSnackbar } = useSnackbar();
  const { cards, setCards, labels, setLabels, board, setDisabled } = useBoard();

  const saveChanges = async (values: { name: string; color: string }) => {
    setDisabled(true);
    hideModal();

    let response: any = {};

    if (label) {
      const res = await updateLabel({
        id: label.id,
        name: values.name,
        color: values.color,
      });
      response.errors = res.error;
      response.data = res.data.updateLabel.label;
    } else {
      const res = await createLabel({
        boardId: board.id,
        name: values.name,
        color: values.color,
      });
      response.errors = res.error;
      response.data = res.data.createLabel.label;
    }

    if (!response.error) {
      const label = response.data as Label;
      setLabels(labels.filter((l) => l.id != label.id).concat(label));
      setCards(
        cards.map((c) => ({
          ...c,
          labels: c.labels.map((l) => (l.id == label.id ? label : l)),
        }))
      );
      const text = label
        ? "Changes saved correctly"
        : "Label created correctly";
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
          name: label?.name,
          color: label?.color,
        }}
        validate={(values) => {
          const errors: Partial<typeof values> = {};

          if (!values.name) {
            errors.name = "Title is required";
          }

          if (!values.color) {
            errors.color = "Priority is required";
          }

          return errors;
        }}
        onSubmit={(values) => {
          saveChanges({
            name: values.name,
            color: values.color,
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
          return (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Label name</Typography>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name != undefined}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Label color</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <ChromePicker
                        color={values.color}
                        onChange={(color) =>
                          setValues({ ...values, color: color.hex })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="color"
                        value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.color != undefined}
                        helperText={errors.color}
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

export default LabelDetailModal;
