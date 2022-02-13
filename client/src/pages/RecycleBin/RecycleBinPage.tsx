import { Container, Typography } from "@mui/material";
import React from "react";
import { useRecycleBin } from "../../context/RecycleBin";
import Loader from "../../components/commons/Loader";

type RecycleBinProps = {};

const RecycleBin = ({}: RecycleBinProps) => {
  const { loading, boards } = useRecycleBin();

  if (loading) {
    return (
      <div className="d-flex center h-100 w-100">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      {boards.length == 0 && (
        <Typography variant="h1">Nothing to see here</Typography>
      )}
    </Container>
  );
};

export default RecycleBin;
