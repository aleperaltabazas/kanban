import { Box, Drawer, Toolbar } from "@mui/material";
import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDrawer } from "../context/Drawer";
import { useBoard } from "../context/Board";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Label } from "../generated/graphql";

type MenuDrawerProps = {};

const drawerWidth = 240;

const MenuDrawer = ({}: MenuDrawerProps) => {
  const { open } = useDrawer();
  const { labels } = useBoard();
  const [selectedLabels, setSelectedLabels] = useState<Array<string>>([]);

  const selectLabel = (label: Label) => {
    if (selectedLabels.includes(label.id)) {
      setSelectedLabels(selectedLabels.filter((lid) => lid != label.id));
    } else {
      setSelectedLabels(selectedLabels.concat(label.id));
    }
  };

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
          <ListItem button key="all">
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItem>
          {labels.map((label) => (
            <ListItem
              button
              key={label.id}
              onClick={() => selectLabel(label)}
              selected={selectedLabels.includes(label.id)}
            >
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
