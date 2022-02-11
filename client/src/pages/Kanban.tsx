import React from "react";
import BoardProvider from "../context/Board";
import KanbanPage from "./Kanban/KanbanPage";
import ModalProvider from "../context/Modal";
import SnackbarProvider from "../context/Snackbar";
import { useLocation, useParams } from "react-router";

type KanbanWrapperProps = {};

type BoardRouterProps = {
  alias: string;
};

type BoardLinkStateProps = {
  id: string;
};

const KanbanWrapper = ({}: KanbanWrapperProps) => {
  const { alias } = useParams<BoardRouterProps>();
  const data = useLocation<BoardLinkStateProps>();

  return (
    <BoardProvider
      boardFetch={
        data.state
          ? { type: "ID", id: data.state.id }
          : { type: "ALIAS", alias }
      }
    >
      <SnackbarProvider>
        <ModalProvider>
          <KanbanPage />
        </ModalProvider>
      </SnackbarProvider>
    </BoardProvider>
  );
};

export default KanbanWrapper;
