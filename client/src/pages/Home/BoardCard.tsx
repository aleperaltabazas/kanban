import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Board } from "../../generated/graphql";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useModal } from "../../context/Modal";
import DeleteBoardModal from "../../components/modals/DeleteBoardModal";
import { makeStyles } from "@mui/styles";
import baseStyles from "../../styles";
import BoardDetailModal from "../../components/modals/BoardDetailModal";

type BoardCardProps = {
  board: Board;
};

const ITEM_HEIGHT = 48;

const useStyles = makeStyles({ ...baseStyles });

const BoardCard = ({ board }: BoardCardProps) => {
  const classes = useStyles();
  const { showModal } = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    closeMenu();
    showModal(<DeleteBoardModal board={board} />);
  };

  const closeMenu = () => setAnchorEl(null);

  const handleClose = () => {
    closeMenu();
  };

  const handleEdit = () => {
    closeMenu();
    showModal(<BoardDetailModal board={board} />);
  };

  return (
    <Card>
      <CardHeader
        action={
          <>
            <IconButton
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
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem
                onClick={handleDelete}
                className={classNames(classes.delete)}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Link
            to={`/boards/${board.id}`}
            className={classNames("normalize-link", "h-100", "d-block")}
          >
            {board.title}
          </Link>
        }
      />
    </Card>
  );
};

export default BoardCard;
