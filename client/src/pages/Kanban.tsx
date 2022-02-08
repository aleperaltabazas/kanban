import React from "react";
import BoardProvider from "../context/Board";
import KanbanPage from "./Kanban/KanbanPage";
import ModalProvider from "../context/Modal";
import SnackbarProvider from "../context/Snackbar";
import { useParams } from "react-router";

type KanbanWrapperProps = {};

type BoardRouterProps = {
  id: string;
};

const KanbanWrapper = ({}: KanbanWrapperProps) => {
  const { id } = useParams<BoardRouterProps>();

  return (
    <BoardProvider boardId={id}>
      <SnackbarProvider>
        <ModalProvider>
          <KanbanPage />
        </ModalProvider>
      </SnackbarProvider>
    </BoardProvider>
  );
};

export default KanbanWrapper;
