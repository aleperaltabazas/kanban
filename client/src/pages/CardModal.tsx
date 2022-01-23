import React, { useContext } from "react";
import { ModalContext } from "../context/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card } from "../generated/graphql";

type CardModalProps = {
  card: Card;
};

const CardModal = ({}: CardModalProps) => {
  const { modalShow, hideModal } = useContext(ModalContext);
  return (
    <div>
      <Dialog
        open={modalShow}
        onClose={hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal}>Disagree</Button>
          <Button onClick={hideModal} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardModal;
