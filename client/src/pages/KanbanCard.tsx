import React, { useContext } from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "../generated/graphql";
import { makeStyles } from "@mui/styles";
import styles from "../styles";
import classnames from "classnames";
import { ModalContext } from "../context/Modal";
import CardModal from "./CardModal";

type KanbanCardProps = {
  card: Card;
};

const useStyles = makeStyles(styles);

const KanbanCard = ({ card }: KanbanCardProps) => {
  const classes = useStyles();
  const { showModal } = useContext(ModalContext);

  return (
    <MuiCard
      sx={{ minWidth: 275 }}
      className={classnames(classes.textAlignLeft)}
      onClick={() => showModal(<CardModal card={card} />)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
      adjective
    </Typography> */}
        <Typography variant="body2">{card.description}</Typography>
      </CardContent>
      {/* <CardActions>
    <Button size="small">Learn More</Button>
  </CardActions> */}
    </MuiCard>
  );
};

export default KanbanCard;
