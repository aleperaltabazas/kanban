import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router";
import styles from "../styles";

type NotFoundProps = {};

const useStyles = makeStyles({
  ...styles,
});

const NotFound = ({}: NotFoundProps) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container>
      <div className="h-100 d-flex center flex-direction-column">
        <Typography variant="h1">404</Typography>
        <Typography variant="h6" className={classes.mt2}>
          Sorry, seems like the resource you requested wasn't found
        </Typography>
        <Button
          variant="contained"
          className={classes.mt1}
          onClick={() => history.push("/")}
        >
          Go back
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
