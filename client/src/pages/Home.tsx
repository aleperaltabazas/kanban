import React, { useEffect } from "react";
import HomePage from "./Home/HomePage";
import HomeProvider from "../context/Home";
import ModalProvider from "../context/Modal";
import SnackbarProvider from "../context/Snackbar";
import store from "../store";
import { updateScreenHomePage } from "../store/actions/common";

type HomeWrapperProps = {};

const HomeWrapper = ({}: HomeWrapperProps) => {
  useEffect(() => {
    store.dispatch(updateScreenHomePage());
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
