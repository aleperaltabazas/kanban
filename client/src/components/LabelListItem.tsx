import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useBoard } from "../context/Board";
import { useModal } from "../context/Modal";
import useLongPress from "../hooks/useLongPress";
import { Label } from "../generated/graphql";
import LabelDetailModal from "./modals/LabelDetailModal";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LabelIcon from "@mui/icons-material/Label";
import DeleteLabelModal from "./modals/DeleteLabelModal";
import classnames from "classnames";
import styles from "../styles";
import { makeStyles } from "@mui/styles";

type LabelListItemProps = {
  label: Label;
};

const useStyles = makeStyles({ ...styles });

const LabelListItem = ({ label }: LabelListItemProps) => {
  const { selectedLabels, setSelectedLabels } = useBoard();
  const { showModal } = useModal();
  const classes = useStyles();

  const selectLabel = () => {
    if (selectedLabels.includes(label.id)) {
      setSelectedLabels(selectedLabels.filter((lid) => lid != label.id));
    } else {
      setSelectedLabels(selectedLabels.concat(label.id));
    }
  };

  const handleEditLabel = () => {
    showModal(<LabelDetailModal label={label} />);
  };

  const handleDeleteLabel = () => {
    showModal(<DeleteLabelModal label={label} />);
  };

  const longPressEvent = useLongPress(handleEditLabel, selectLabel, {
    shouldPreventDefault: true,
    delay: 500,
  });

  return (
    <ListItem
      selected={selectedLabels.includes(label.id)}
      key={label.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteLabel}>
          <RemoveCircleIcon />
        </IconButton>
      }
      disablePadding
      style={{
        marginBottom: "5px",
      }}
    >
      <ListItemButton dense {...longPressEvent}>
        <ListItemIcon>
          <LabelIcon sx={{ color: label.color }} />
        </ListItemIcon>
        <ListItemText id={label.id} primary={label.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default LabelListItem;
