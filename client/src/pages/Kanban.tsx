import React from "react";
import Layout from "../components/Layout";
import BoardContext from "../context/Board";
import KanbanColumns from "./KanbanColumns";
import ModalContext from "../context/Modal";
import SnackbarContext from "../context/Snackbar";
import DrawerContext from "../context/Drawer";
import { useParams } from "react-router";

type KanbanPageProps = {};

type BoardRouterProps = {
  id: string;
};

const KanbanPage = ({}: KanbanPageProps) => {
  const { id } = useParams<BoardRouterProps>();
  console.log(id);
  return (
    <>
      <BoardContext boardId={id}>
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
