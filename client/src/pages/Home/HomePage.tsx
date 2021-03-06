import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Loader from "../../components/commons/Loader";
import { useHome } from "../../context/Home";
import baseStyles from "../../styles";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import BoardCard from "./BoardCard";
import { useModal } from "../../context/Modal";
import BoardDetailModal from "../../components/modals/BoardDetailModal";
import { DateTime } from "luxon";
import { compareLuxonDates } from "../../functions/date";

type HomePageProps = {};

const useStyles = makeStyles({ ...baseStyles });

const HomePage = ({}: HomePageProps) => {
  const { boards, loading } = useHome();
  const { showModal } = useModal();
  const classes = useStyles();

  if (loading) {
    return (
      <div className="h-100 w-100 d-flex center">
        <Loader />
      </div>
    );
  }

  return (
    <Container className={classnames(classes.mt4)}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={6}>
          <Typography variant="h4">Boards</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent="flex-end"
          className="d-flex center-v justify-content-end"
        >
          <Button
            variant="contained"
            onClick={() => showModal(<BoardDetailModal />)}
          >
            New board
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={10} className={classes.pt1}>
        {boards
          .sort(
            (b1, b2) =>
              compareLuxonDates(
                DateTime.fromISO(b1.lastUpdated),
                DateTime.fromISO(b2.lastUpdated)
              ) * -1
          )
          .map((b) => (
            <Grid item xs={12} md={4} key={b.id}>
              <BoardCard board={b} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
