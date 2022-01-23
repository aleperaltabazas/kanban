import { Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card, StatusInput } from "../generated/graphql";
import classnames from "classnames";
import padding from "../jss/padding";
import typography from "../jss/typography";

type ColumnProps = {
  title: string;
  moveTo: StatusInput[];
  cards: Card[];
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
  },
  ...padding,
  ...typography,
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
      <Divider orientation="horizontal" />
      {cards.map((c, i) => (
        <div key={i}>{c.title}</div>
      ))}
    </div>
  );
};

export default Column;
