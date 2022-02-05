import React from "react";
import BoardContext from "../context/Board";
import KanbanPage from "./Kanban/KanbanPage";
import ModalContext from "../context/Modal";
import SnackbarContext from "../context/Snackbar";
import DrawerContext from "../context/Drawer";
import { useParams } from "react-router";

type KanbanWrapperProps = {};

type BoardRouterProps = {
  id: string;
};

const KanbanWrapper = ({}: KanbanWrapperProps) => {
  const { id } = useParams<BoardRouterProps>();

  return (
    <BoardContext boardId={id}>
      <DrawerContext>
        <SnackbarContext>
          <ModalContext>
            <KanbanPage />
          </ModalContext>
        </SnackbarContext>
      </DrawerContext>
    </BoardContext>
  );
};

export default KanbanWrapper;
