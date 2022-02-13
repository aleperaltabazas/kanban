import React, { useEffect } from "react";
import RecycleBinPage from "./RecycleBin/RecycleBinPage";
import RecycleBinProvider from "../context/RecycleBin";
import ModalProvider from "../context/Modal";
import SnackbarProvider from "../context/Snackbar";
import store from "../store";
import { updateScreenTrashPage } from "../store/actions/common";

type RecycleBinWrapperProps = {};

const RecycleBinWrapper = ({}: RecycleBinWrapperProps) => {
  useEffect(() => {
    store.dispatch(updateScreenTrashPage());
  }, []);

  return (
    <RecycleBinProvider>
      <SnackbarProvider>
        <ModalProvider>
          <RecycleBinPage />
        </ModalProvider>
      </SnackbarProvider>
    </RecycleBinProvider>
  );
};

export default RecycleBinWrapper;
