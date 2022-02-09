import { Container, Grid, Typography, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card, StatusInput } from "../../generated/graphql";
import classnames from "classnames";
import KanbanCard from "./KanbanCard";
import baseStyles from "../../styles";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../context/Modal";
import CardDetailModal from "../../components/modals/CardDetailModal";

type ColumnProps = {
  title: string;
  moveTo: StatusInput[];
  cards: Card[];
  status: StatusInput;
};

const useStyles = makeStyles({
  column: {
    backgroundColor: "#ececec",
  },
  cards: {
    overflow: "auto",
    maxHeight: "750px",
  },
  ...baseStyles,
});

const Column = ({ title, moveTo, cards, status }: ColumnProps) => {
  const classes = useStyles();
  const { showModal } = useModal();

  return (
    <div className={classnames("w-100", "h-100", classes.column)}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classnames(
              classes.pb1,
              classes.pt1,
              classes.pl1,
              classes.bold,
              classes.textAlignLeft
            )}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          className="d-flex center-v"
          style={{ justifyContent: "flex-end", paddingBottom: 8 }}
        >
          <AddIcon
            fontSize="inherit"
            style={{
              fontSize: "28",
              fontWeight: "bold",
            }}
            className="cursor-pointer"
            onClick={() => showModal(<CardDetailModal status={status} />)}
          />
        </Grid>
      </Grid>
      <Container maxWidth="xl" className={classnames(classes.cards)}>
        <Stack spacing={2}>
          {cards
            .sort((c1, c2) => c2.priority - c1.priority)
            .map((c) => (
              <KanbanCard key={c.id} status={status} card={c} moveTo={moveTo} />
            ))}
        </Stack>
      </Container>
    </div>
  );
};

export default Column;
