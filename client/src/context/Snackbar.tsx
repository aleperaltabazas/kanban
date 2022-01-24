import React, { useContext } from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiSnackbar from "@mui/material/Snackbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

type ShowSnackbarProps = {
  text: string;
  actionChildren?: JSX.Element;
};

export interface SnackbarContextProps {
  snackbarOpen: boolean;
  showSnackbar: (props: ShowSnackbarProps) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = React.createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
);

export const useSnackbar = () => useContext(SnackbarContext);

const Snackbar = (props: Props): JSX.Element => {
  const { children } = props;

  const [snackbarText, setSnackbarText] = useState<string>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [actionChildren, setActionChildren] = useState<
    JSX.Element | undefined
  >();

  const showSnackbar = (props: ShowSnackbarProps) => {
    setSnackbarText(props.text);
    setActionChildren(props.actionChildren);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => setSnackbarOpen(false);

  const context: SnackbarContextProps = {
    snackbarOpen: snackbarOpen,
    showSnackbar: showSnackbar,
    hideSnackbar: hideSnackbar,
  };

  const action = (
    <React.Fragment>
      {actionChildren}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={hideSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SnackbarContext.Provider value={context}>
      {children}
      <MuiSnackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={hideSnackbar}
        message={snackbarText}
        action={action}
      />
    </SnackbarContext.Provider>
  );
};

export default Snackbar;
