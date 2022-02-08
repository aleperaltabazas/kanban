import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { StatusInput } from "../../generated/graphql";
import Board, { useBoard } from "../../context/Board";
import Column from "./Column";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import styles from "../../styles";
import Loader from "../../components/commons/Loader";
import store from "../../store";
import { UPDATE_TITLE } from "../../reducers/common";

type KanbanPageProps = {};

const useStyles = makeStyles({ ...styles });

const KanbanPage = ({}: KanbanPageProps) => {
  const { board, cards, loading, disabled, selectedLabels } = useBoard();
  const filteredCards = cards.filter(
    (c) =>
      selectedLabels.length == 0 ||
      c.labels.some((l) => selectedLabels.includes(l.id))
  );
  const classes = useStyles();

  useEffect(() => {
    board && store.dispatch({ type: UPDATE_TITLE, payload: board.title });
  }, [board]);

  if (loading) {
    return (
      <div className="h-100 w-100 center">
        <Loader />
      </div>
    );
  }

  return (
    <Container
      className={classnames(
        "h-100",
        classes.mt4,
        classes.mb1,
        disabled ? classes.disabled : undefined
      )}
      maxWidth="lg"
    >
      <Stack spacing={2} className="h-100" direction="row">
        <Column
          title="Backlog"
          moveTo={[StatusInput.Wip]}
          cards={filteredCards.filter((c) => c.status.__typename == "Backlog")}
          status={StatusInput.Backlog}
        />
        <Column
          title="WIP"
          moveTo={[StatusInput.Backlog, StatusInput.Done]}
          cards={filteredCards.filter((c) => c.status.__typename == "WIP")}
          status={StatusInput.Wip}
        />
        <Column
          title="Done"
          moveTo={[StatusInput.Wip]}
          cards={filteredCards.filter((c) => c.status.__typename == "Done")}
          status={StatusInput.Done}
        />
      </Stack>
    </Container>
  );
};

export default KanbanPage;
