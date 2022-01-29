import React, { useContext } from "react";
import { useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export interface DrawerContextProps {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = React.createContext<DrawerContextProps>(
  {} as DrawerContextProps
);

export const useDrawer = () => useContext(DrawerContext);

const Drawer = ({ children }: Props): JSX.Element => {
  const [open, setOpen] = useState(true);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen(!open);

  const context: DrawerContextProps = {
    open,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };

  return (
    <DrawerContext.Provider value={context}>{children}</DrawerContext.Provider>
  );
};

export default Drawer;
