import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
import { useModal } from "../../context/Modal";
import LabelDetailModal from "../../components/modals/LabelDetailModal";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LabelListItem from "../../components/LabelListItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type KanbanPageProps = {};

const useStyles = makeStyles({ ...styles });

const KanbanPage = ({}: KanbanPageProps) => {
  const {
    board,
    cards,
    loading,
    disabled,
    labels,
    selectedLabels,
    setSelectedLabels,
  } = useBoard();
  const { showModal } = useModal();
  const filteredCards = cards.filter(
    (c) =>
      selectedLabels.length == 0 ||
      c.labels.some((l) => selectedLabels.includes(l.id))
  );
  const classes = useStyles();

  const clearLabelFilters = () => {
    setSelectedLabels([]);
  };

  const handleNewLabel = () => {
    showModal(<LabelDetailModal />);
  };

  useEffect(() => {
    board &&
      store.dispatch({
        type: UPDATE_TITLE,
        payload: { type: "BOARD", title: board.title },
      });
  }, [board]);

  if (loading) {
    return (
      <div className="h-100 w-100 d-flex center">
        <Loader />
      </div>
    );
  }

  return (
    <Grid
      container
      className={classnames(
        "h-100",
        "w-100",
        disabled ? classes.disabled : undefined
      )}
    >
      <Grid item xs={3} sx={{ background: "white" }}>
        <List className={classnames("h-100", classes.pt3)}>
          <ListItem key={"all"} disablePadding>
            <ListItemButton dense onClick={clearLabelFilters}>
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
          {labels.map((label) => (
            <LabelListItem label={label} />
          ))}
          <Divider />
          <ListItem button key="new-task" onClick={handleNewLabel}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={<Button variant="text">new label</Button>} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={9} className="h-100" sx={{ overflow: "auto" }}>
        <Container className={classnames("h-100")} maxWidth="xl">
          <Stack
            spacing={2}
            className={classnames("h-100", classes.pt3)}
            direction="row"
          >
            <Column
              title="Backlog"
              moveTo={[StatusInput.Wip]}
              cards={filteredCards.filter(
                (c) => c.status.__typename == "Backlog"
              )}
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
      </Grid>
    </Grid>
  );
};

export default KanbanPage;
