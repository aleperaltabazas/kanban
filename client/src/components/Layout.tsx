import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuDrawer from "./drawer/BoardDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawer } from "../context/Drawer";

type LayoutProps = {
  children: React.ReactNode;
  drawer: React.ReactNode;
  title: string;
};

const Layout = ({ children, drawer, title }: LayoutProps) => {
  const { toggleDrawer } = useDrawer();
  return (
    <Box sx={{ display: "flex", backgroundColor: "#bbbbbb" }} className="h-100">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "capitalize" }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {drawer}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflow: "hidden", marginBottom: "15px" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
