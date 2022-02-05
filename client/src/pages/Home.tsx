import React from "react";
import HomePage from "./Home/HomePage";
import HomeProvider from "../context/Home";
import ModalProvider from "../context/Modal";
import DrawerProvider from "../context/Drawer";
import SnackbarProvider from "../context/Snackbar";
import Layout from "../components/Layout";

type HomeWrapperProps = {};

const HomeWrapper = ({}: HomeWrapperProps) => {
  return (
    <HomeProvider>
      <DrawerProvider>
        <SnackbarProvider>
          <ModalProvider>
            <Layout drawer={null} title="kanban">
              <HomePage />
            </Layout>
          </ModalProvider>
        </SnackbarProvider>
      </DrawerProvider>
    </HomeProvider>
  );
};

export default HomeWrapper;
