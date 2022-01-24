import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { makeStyles } from "@mui/styles";

type LabelProps = {
  color: string;
};

const useStyles = (color: string) =>
  makeStyles({
    root: {
      color: color,
    },
  });

const Label = ({ color }: LabelProps) => {
  const classes = useStyles(color)();
  return <BookmarkIcon className={classes.root} />;
};

export default Label;
