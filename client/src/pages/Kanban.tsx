import React from "react";
import Header from "../components/Header";
import Board from "../context/Board";
import KanbanColumns from "./KanbanColumns";
import Modal from "../context/Modal";
import Snackbar from "../context/Snackbar";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  return (
    <>
      <Header />
      <Board>
        <Snackbar>
          <Modal>
            <KanbanColumns />
          </Modal>
        </Snackbar>
      </Board>
    </>
  );
};

export default KanbanPage;
