import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card, StatusInput } from "../generated/graphql";
import classnames from "classnames";
import KanbanCard from "./KanbanCard";
import baseStyles from "../styles";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../context/Modal";
import CardDetailsModal from "./CardDetailModal";

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
  const { showModal } = useModal();

  return (
    <div className={classnames("w-100", "h-100", classes.root)}>
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
          className="center-v"
          style={{ justifyContent: "flex-end", paddingBottom: 8 }}
        >
          <AddIcon
            fontSize="inherit"
            style={{
              fontSize: "28",
              fontWeight: "bold",
            }}
            className="cursor-pointer"
            onClick={() => showModal(<CardDetailsModal status={status} />)}
          />
        </Grid>
      </Grid>
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
