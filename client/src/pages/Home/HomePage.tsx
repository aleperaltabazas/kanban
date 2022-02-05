import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/commons/Loader";
import { useHome } from "../../context/Home";
import baseStyles from "../../styles";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";

type HomePageProps = {};

const useStyles = makeStyles({ ...baseStyles });

const HomePage = ({}: HomePageProps) => {
  const { boards, loading } = useHome();
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
            <Link
              to={`/boards/${b.id}`}
              className={classnames("normalize-link")}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {b.title}
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
