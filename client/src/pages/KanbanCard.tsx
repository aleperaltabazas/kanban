import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Card } from "../generated/graphql";
import { makeStyles } from "@mui/styles";
import styles from "../styles";
import classnames from "classnames";
import { useModal } from "../context/Modal";
import CardModal from "./CardModal";
import Label from "../components/commons/Label";

type KanbanCardProps = {
  card: Card;
};

const useStyles = makeStyles({
  ...styles,
  labels: {
    overflow: "hidden",
  },
});

const KanbanCard = ({ card }: KanbanCardProps) => {
  const classes = useStyles();
  const { showModal } = useModal();

  return (
    <MuiCard
      sx={{ minWidth: 275 }}
      className={classnames(classes.textAlignLeft, "cursor-pointer")}
      onClick={() => showModal(<CardModal card={card} />)}
    >
      <CardContent>
        <div className={classnames(classes.labels)}>
          {card.labels.map((l, idx) => (
            <Label color={l.color} key={idx} />
          ))}
        </div>
        <Typography variant="h6" component="div">
          {card.title}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
      adjective
    </Typography> */}
        <Typography variant="body2">{card.description}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default KanbanCard;
