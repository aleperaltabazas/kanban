import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Card, StatusInput, useMoveCardMutation } from "../generated/graphql";
import { makeStyles } from "@mui/styles";
import styles from "../styles";
import classnames from "classnames";
import { useModal } from "../context/Modal";
import CardDetailModal from "../components/modals/CardDetailModal";
import Label from "../components/commons/Label";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardHeader, Divider, Stack } from "@mui/material";
import { useBoard } from "../context/Board";
import { useSnackbar } from "../context/Snackbar";
import DeleteCardModal from "./DeleteCardModal";
import { isTooDark } from "../functions/color";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type KanbanCardProps = {
  card: Card;
  moveTo: StatusInput[];
  status: StatusInput;
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

const KanbanCard = ({ card, moveTo, status }: KanbanCardProps) => {
  const classes = useStyles();
  const { showModal } = useModal();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { disabled, setDisabled, cards, setCards } = useBoard();
  const [, moveMutation] = useMoveCardMutation();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    closeMenu();
    showModal(<DeleteCardModal card={card} />);
  };

  const closeMenu = () => setAnchorEl(null);

  const moveCard = async (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    closeMenu();
    setDisabled(true);

    const response = await moveMutation({ id: card.id, to: moveTo[index] });

    if (response.error) {
      showSnackbar({ text: "There was an error moving the card" });
    } else {
      setCards(
        cards.map((c) => (c.id == card.id ? response.data.moveCard.card : c))
      );
      setDisabled(false);
    }
  };

  const handleClose = () => {
    closeMenu();
  };

  const headerColor = card.labels.length > 0 ? card.labels[0].color : "#ffffff";

  const prettyOption = (option: StatusInput) => {
    switch (option) {
      case StatusInput.Backlog:
        return "Backlog";
      case StatusInput.Wip:
        return "WIP";
      case StatusInput.Done:
        return "Done";
    }
  };

  return (
    <MuiCard
      sx={{ minWidth: 275 }}
      className={classnames(classes.textAlignLeft)}
    >
      <CardHeader
        style={{ backgroundColor: headerColor }}
        title={
          <Typography
            variant="h6"
            color={isTooDark(headerColor) ? "white" : null}
          >
            {card.title}
          </Typography>
        }
        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              disabled={disabled}
              style={{
                color: isTooDark(headerColor) && "white",
              }}
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
                  onClick={(event) => moveCard(event, index)}
                >
                  Move to {prettyOption(option)}
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
        className={classnames(!disabled ? "cursor-pointer" : undefined)}
        onClick={() =>
          showModal(<CardDetailModal status={status} card={card} />)
        }
      >
        <Typography
          variant="caption"
          display="block"
          sx={{ marginBottom: "5px" }}
        >
          Priority: {card.priority}
          {/* <Stack direction="row">
            {Array(card.priority).fill(
              <FiberManualRecordIcon sx={{ fontSize: "8px" }} />
            )}
          </Stack> */}
        </Typography>
        <Typography
          variant="subtitle1"
          display="block"
          className={classnames(classes.clamp3)}
        >
          {card.description}
        </Typography>
        <div className={classnames(classes.labels)}>
          {card.labels.map((l, idx) => (
            <Label color={l.color} key={idx} />
          ))}
        </div>
      </CardContent>
    </MuiCard>
  );
};

export default KanbanCard;
