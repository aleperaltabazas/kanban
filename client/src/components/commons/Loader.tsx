import { CircularProgress } from "@mui/material";
import React from "react";

type LoaderProps = { full?: boolean };

const Loader = (props: LoaderProps) => {
  return <CircularProgress />;
};

export default Loader;
