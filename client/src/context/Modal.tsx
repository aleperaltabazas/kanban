import React, { useContext } from "react";
import { useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export interface ModalContextProps {
  modalShow: boolean;
  showModal: (children: JSX.Element[] | JSX.Element) => void;
  hideModal: () => void;
}

const ModalContext = React.createContext<ModalContextProps>(
  {} as ModalContextProps
);

export const useModal = () => useContext(ModalContext);

const Modal = (props: Props): JSX.Element => {
  const { children } = props;

  const [modalChildren, setModalChildren] = useState<
    string | JSX.Element[] | JSX.Element | null
  >(null);
  const [modalShow, setModalShow] = useState(false);

  const showModal = (children: JSX.Element[] | JSX.Element) => {
    setModalChildren(children);
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
    setModalChildren(undefined);
  };

  const context: ModalContextProps = {
    modalShow: modalShow,
    showModal: showModal,
    hideModal: hideModal,
  };

  return (
    <ModalContext.Provider value={context}>
      {children}
      {modalChildren}
    </ModalContext.Provider>
  );
};

export default Modal;
