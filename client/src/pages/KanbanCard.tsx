import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Card, StatusInput, useMoveCardMutation } from "../generated/graphql";
import { makeStyles } from "@mui/styles";
import styles from "../styles";
import classnames from "classnames";
import { useModal } from "../context/Modal";
import CardDetailModal from "./CardDetailModal";
import Label from "../components/commons/Label";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardHeader, Divider } from "@mui/material";
import { useBoard } from "../context/Board";
import { useSnackbar } from "../context/Snackbar";
import DeleteCardModal from "./DeleteCardModal";

type KanbanCardProps = {
  card: Card;
  moveTo: StatusInput[];
};

const useStyles = makeStyles({
  ...styles,
  labels: {
    overflow: "hidden",
  },
  delete: {
    color: "#e61d1d",
    fontWeight: 420,
  },
});

const ITEM_HEIGHT = 48;

const KanbanCard = ({ card, moveTo }: KanbanCardProps) => {
  const classes = useStyles();
  const { showModal } = useModal();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { setLoading, cards, setCards } = useBoard();
  const [, moveMutation] = useMoveCardMutation();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    showModal(<DeleteCardModal card={card} />);
  };

  const handleSelect = async (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(null);
    setLoading(true);

    const response = await moveMutation({ id: card.id, to: moveTo[index] });

    if (response.error) {
      showSnackbar({ text: "There was an error moving the card" });
    } else {
      setCards(
        cards.map((c) => (c.id == card.id ? response.data.moveCard.card : c))
      );
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiCard
      sx={{ minWidth: 275 }}
      className={classnames(classes.textAlignLeft)}
    >
      <CardHeader
        title={<Typography variant="h6">{card.title}</Typography>}
        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {moveTo.map((option, index) => (
                <MenuItem
                  key={option}
                  onClick={(event) => handleSelect(event, index)}
                >
                  Move to {option}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleDelete} className={classes.delete}>
                Delete
              </MenuItem>
            </Menu>
          </>
        }
      ></CardHeader>
      <Divider orientation="horizontal" />
      <CardContent
        className={classnames("cursor-pointer")}
        onClick={() => showModal(<CardDetailModal card={card} />)}
      >
        <div className={classnames(classes.labels)}>
          {card.labels.map((l, idx) => (
            <Label color={l.color} key={idx} />
          ))}
        </div>
        <Typography variant="body2">{card.description}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default KanbanCard;
