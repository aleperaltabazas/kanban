import { Container } from "@mui/material";
import React from "react";
import Loader from "../components/commons/Loader";
import { useCardsQuery } from "../generated/graphql";
import Columns from "./Columns";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  const [{ data, fetching }] = useCardsQuery();
  console.log(data);
  return (
    <Container className="h-100" maxWidth="xl">
      {fetching ? <Loader full /> : <Columns cards={data.cards} />}
    </Container>
  );
};

export default KanbanPage;
