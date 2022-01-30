import {
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDrawer } from "../context/Drawer";
import { useBoard } from "../context/Board";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Label } from "../generated/graphql";
import EditIcon from "@mui/icons-material/Edit";
import { useModal } from "../context/Modal";
import LabelDetailsModal from "./LabelDetailModal";

type MenuDrawerProps = {};

const drawerWidth = 240;

const MenuDrawer = ({}: MenuDrawerProps) => {
  const { open } = useDrawer();
  const { labels, selectedLabels, setSelectedLabels } = useBoard();
  const { showModal } = useModal();

  const selectLabel = (label: Label) => {
    if (selectedLabels.includes(label.id)) {
      setSelectedLabels(selectedLabels.filter((lid) => lid != label.id));
    } else {
      setSelectedLabels(selectedLabels.concat(label.id));
    }
  };

  const clearLabelFilters = () => {
    setSelectedLabels([]);
  };

  const handleNewLabel = () => {
    showModal(<LabelDetailsModal />);
  };

  const handleEditLabel = (label: Label) => {
    showModal(<LabelDetailsModal label={label} />);
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
          <ListItem button key="all" onClick={clearLabelFilters}>
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItem>
          {labels.map((label) => (
            <ListItem
              button
              key={label.id}
              selected={selectedLabels.includes(label.id)}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleEditLabel(label)}
                >
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemAvatar onClick={() => selectLabel(label)}>
                <BookmarkIcon sx={{ color: label.color }} />
              </ListItemAvatar>
              <ListItemText
                primary={label.name}
                onClick={() => selectLabel(label)}
              />
            </ListItem>
          ))}
          <Divider />
          <ListItem button key="new-task" onClick={handleNewLabel}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={<Button variant="text">new label</Button>} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuDrawer;
