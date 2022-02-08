import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";

type HeaderProps = { title: string };

const Header = ({ title }: HeaderProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textTransform: "capitalize" }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (root: RootState) => ({
  title: root.common.title,
});

export default connect(mapStateToProps)(Header);
