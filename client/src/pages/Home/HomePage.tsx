import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Loader from "../../components/commons/Loader";
import { useHome } from "../../context/Home";
import baseStyles from "../../styles";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import BoardCard from "./BoardCard";
import { useModal } from "../../context/Modal";
import BoardDetailModal from "../../components/modals/BoardDetailModal";

type HomePageProps = {};

const useStyles = makeStyles({ ...baseStyles });

const HomePage = ({}: HomePageProps) => {
  const { boards, loading } = useHome();
  const { showModal } = useModal();
  const classes = useStyles();

  if (loading) {
    return (
      <div className="h-100 w-100 center">
        <Loader />
      </div>
    );
  }

  return (
    <Container className={classnames(classes.mt4)}>
      <Grid container spacing={10}>
        {boards.map((b) => (
          <Grid item xs={4} key={b.id}>
            <BoardCard board={b} />
          </Grid>
        ))}
        <Grid item xs={4} key="new">
          <Card onClick={() => showModal(<BoardDetailModal />)}>
            <CardContent>
              <Typography variant="h5">
                <AddIcon />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
