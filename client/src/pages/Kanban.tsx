import { Container, Grid } from "@mui/material";
import React from "react";
import { StatusInput } from "../generated/graphql";
import Cards from "../context/Cards";
import Column from "./Column";

type KanbanPageProps = {};

const KanbanPage = ({}: KanbanPageProps) => {
  return (
    <Cards>
      <Container className="h-100" maxWidth="xl">
        <Grid container spacing={2} className="h-100">
          <Grid item xs={12} md={4} className="h-100">
            <Column title="Backlog" moveTo={[StatusInput.Wip]} cards={[]} />
          </Grid>
          <Grid item xs={12} md={4} className="h-100">
            <Column
              title="WIP"
              moveTo={[StatusInput.Backlog, StatusInput.Done]}
              cards={[]}
            />
          </Grid>
          <Grid item xs={12} md={4} className="h-100">
            <Column title="Done" moveTo={[]} cards={[]} />
          </Grid>
        </Grid>
      </Container>
    </Cards>
  );
};

export default KanbanPage;
