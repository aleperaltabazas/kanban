import { Container, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card, StatusInput } from "../generated/graphql";
import classnames from "classnames";
import padding from "../jss/padding";
import typography from "../jss/typography";
import KanbanCard from "./KanbanCard";
import baseStyles from "../styles";

type ColumnProps = {
  title: string;
  moveTo: StatusInput[];
  cards: Card[];
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#efefef",
    overflow: "scroll",
  },
  ...baseStyles,
});

const Column = ({ title, moveTo, cards }: ColumnProps) => {
  const classes = useStyles();

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
            <Grid item xs={12}>
              <KanbanCard card={c} key={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Column;