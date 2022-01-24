import React from "react";
import { useSnackbar } from "../context/Snackbar";
import Header from "../components/Header";
import Board from "../context/Board";
import KanbanColumns from "./KanbanColumns";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  return (
    <>
      <Header />
      <Board>
        <KanbanColumns />
      </Board>
    </>
  );
};

export default KanbanPage;
