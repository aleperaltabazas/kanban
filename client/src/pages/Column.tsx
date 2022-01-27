import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card, StatusInput } from "../generated/graphql";
import classnames from "classnames";
import KanbanCard from "./KanbanCard";
import baseStyles from "../styles";
import { useSnackbar } from "../context/Snackbar";

type ColumnProps = {
  title: string;
  moveTo: StatusInput[];
  cards: Card[];
  status: StatusInput;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#efefef",
    overflow: "scroll",
  },
  ...baseStyles,
});

const Column = ({ title, moveTo, cards, status }: ColumnProps) => {
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  return (
    <div className={classnames("w-100", "h-100", classes.root)}>
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
      <Container maxWidth="xl">
        <Grid container rowSpacing={2}>
          {cards.map((c, i) => (
            <Grid item xs={12} key={i}>
              <KanbanCard status={status} card={c} moveTo={moveTo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Column;
