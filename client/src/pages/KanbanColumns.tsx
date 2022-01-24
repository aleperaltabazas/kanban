import { Container, Grid } from "@mui/material";
import React from "react";
import { StatusInput } from "../generated/graphql";
import { useBoard } from "../context/Board";
import Column from "./Column";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import styles from "../styles";

type KanbanColumnsProps = {};

const useStyles = makeStyles(styles);

const KanbanColumns = ({}: KanbanColumnsProps) => {
  const { cards } = useBoard();
  const classes = useStyles();

  return (
    <Container className={classnames("h-100", classes.mt3)} maxWidth="xl">
      <Grid container spacing={2} className="h-100">
        <Grid item xs={12} md={4} className="h-100">
          <Column
            title="Backlog"
            moveTo={[StatusInput.Wip]}
            cards={cards.filter((c) => c.status.__typename == "Backlog")}
          />
        </Grid>
        <Grid item xs={12} md={4} className="h-100">
          <Column
            title="WIP"
            moveTo={[StatusInput.Backlog, StatusInput.Done]}
            cards={cards.filter((c) => c.status.__typename == "WIP")}
          />
        </Grid>
        <Grid item xs={12} md={4} className="h-100">
          <Column
            title="Done"
            moveTo={[]}
            cards={cards.filter((c) => c.status.__typename == "Done")}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default KanbanColumns;
