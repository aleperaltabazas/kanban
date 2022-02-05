import { Box, Button, Drawer, ListItemButton, Toolbar } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDrawer } from "../../context/Drawer";
import { useBoard } from "../../context/Board";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useModal } from "../../context/Modal";
import LabelDetailModal from "../modals/LabelDetailModal";
import LabelListItem from "../LabelListItem";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";
import baseStyles from "../../styles";

type BoardDrawerProps = {};

const drawerWidth = 240;

const useStyles = makeStyles({
  maxHeight360: {
    // maxHeight: "360px",
  },
  ...baseStyles,
});

const BoardDrawer = ({}: BoardDrawerProps) => {
  const { open } = useDrawer();
  const { labels, setSelectedLabels } = useBoard();
  const { showModal } = useModal();
  const classes = useStyles();

  const clearLabelFilters = () => {
    setSelectedLabels([]);
  };

  const handleNewLabel = () => {
    showModal(<LabelDetailModal />);
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
        <List className={classnames(classes.maxHeight360)}>
          <ListItem key={"all"} disablePadding>
            <ListItemButton dense onClick={clearLabelFilters}>
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
          {labels.map((label) => (
            <LabelListItem label={label} />
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

export default BoardDrawer;
