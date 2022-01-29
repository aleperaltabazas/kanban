import React from "react";
import Layout from "../components/Layout";
import BoardContext from "../context/Board";
import KanbanColumns from "./KanbanColumns";
import ModalContext from "../context/Modal";
import SnackbarContext from "../context/Snackbar";
import DrawerContext from "../context/Drawer";
import MenuDrawer from "../components/MenuDrawer";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  return (
    <>
      <BoardContext>
        <DrawerContext>
          <SnackbarContext>
            <ModalContext>
              <Layout>
                <KanbanColumns />
              </Layout>
            </ModalContext>
          </SnackbarContext>
        </DrawerContext>
      </BoardContext>
    </>
  );
};

export default KanbanPage;
