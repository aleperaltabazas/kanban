import React from "react";
import Header from "../components/Header";
import Cards from "../context/Cards";
import KanbanColumns from "./KanbanColumns";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  return (
    <>
      <Header />
      <Cards>
        <KanbanColumns />
      </Cards>
    </>
  );
};

export default KanbanPage;
