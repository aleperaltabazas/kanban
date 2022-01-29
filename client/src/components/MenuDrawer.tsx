import { Box, Drawer, Toolbar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDrawer } from "../context/Drawer";
import { useBoard } from "../context/Board";
import BookmarkIcon from "@mui/icons-material/Bookmark";

type MenuDrawerProps = {};

const drawerWidth = 240;

const MenuDrawer = ({}: MenuDrawerProps) => {
  const { open } = useDrawer();
  const { labels } = useBoard();

  return (
    <Drawer
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={open}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {labels.map((label, idx) => (
            <ListItem button key={label.id}>
              <ListItemIcon>
                <BookmarkIcon sx={{ color: label.color }} />
              </ListItemIcon>
              <ListItemText primary={label.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default MenuDrawer;
