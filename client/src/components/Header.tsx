import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type HeaderProps = {
  title: string;
  history: ReturnType<typeof createBrowserHistory>;
};

const Header = ({ title, history }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={history.goBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {/* {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )} */}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (root: RootState) => ({
  title: root.common.title,
});

export default connect(mapStateToProps)(Header);
