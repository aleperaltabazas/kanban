import React, { useEffect } from "react";
import HomePage from "./Home/HomePage";
import HomeProvider from "../context/Home";
import ModalProvider from "../context/Modal";
import SnackbarProvider from "../context/Snackbar";
import store from "../store";
import { UPDATE_TITLE } from "../reducers/common";

type HomeWrapperProps = {};

const HomeWrapper = ({}: HomeWrapperProps) => {
  useEffect(() => {
    store.dispatch({ type: UPDATE_TITLE, payload: { type: "HOME" } });
  }, []);

  return (
    <HomeProvider>
      <SnackbarProvider>
        <ModalProvider>
          <HomePage />
        </ModalProvider>
      </SnackbarProvider>
    </HomeProvider>
  );
};

export default HomeWrapper;
