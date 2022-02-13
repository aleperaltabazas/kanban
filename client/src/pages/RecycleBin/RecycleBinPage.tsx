import { Container, Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useRecycleBin } from "../../context/RecycleBin";
import Loader from "../../components/commons/Loader";
import { makeStyles } from "@mui/styles";
import styles from "../../styles";
import classnames from "classnames";
import BoardCard from "../../components/BoardCard";
import { Board, useRestoreBoardMutation } from "../../generated/graphql";
import { useModal } from "../../context/Modal";
import PermanentDeleteBoardModal from "../../components/modals/PermanentDeleteBoardModal";

type RecycleBinProps = {};

const useStyles = makeStyles({ ...styles });

const RecycleBin = ({}: RecycleBinProps) => {
  const { loading, boards, setBoards } = useRecycleBin();
  const { showModal } = useModal();
  const classes = useStyles();
  const [, restoreBoard] = useRestoreBoardMutation();

  if (loading) {
    return (
      <div className="d-flex center h-100 w-100">
        <Loader />
      </div>
    );
  }

  const handleRestore = async (closeMenu: () => void, board: Board) => {
    closeMenu();
    const response = await restoreBoard({ id: board.id });
    setBoards(boards.filter((b) => b.id != board.id));
  };

  const handlePermaDelete = (closeMenu: () => void, board: Board) => {
    closeMenu();
    showModal(<PermanentDeleteBoardModal board={board} />);
  };

  return (
    <Container className={classnames(classes.mt4)}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12}>
          <Typography variant="h4">Recycle bin</Typography>
        </Grid>
      </Grid>
      {boards.length == 0 && (
        <Typography
          variant="h3"
          className={classnames("d-flex center-h", classes.mt3)}
        >
          No deleted boards
        </Typography>
      )}
      {boards.length > 0 && (
        <Grid container spacing={10} className={classes.pt1}>
          {boards.map((b) => (
            <Grid item xs={12} md={4} key={b.id}>
              <BoardCard
                board={b}
                options={(closeMenu) => [
                  <MenuItem onClick={() => handleRestore(closeMenu, b)}>
                    Restore
                  </MenuItem>,
                  <MenuItem
                    onClick={() => handlePermaDelete(closeMenu, b)}
                    className={classnames(classes.delete)}
                  >
                    Delete
                  </MenuItem>,
                ]}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RecycleBin;
