import React, { useContext, useEffect, useState } from "react";
import { Card, Label, useInitQuery } from "../generated/graphql";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type BoardContextProps = {
  cards: Array<Card>;
  setCards: (cards: Array<Card>) => void;
  labels: Array<Label>;
  setLabels: (labels: Array<Label>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  selectedLabels: Array<string>;
  setSelectedLabels: (labelIds: Array<string>) => void;
};

const BoardContext = React.createContext<BoardContextProps>(
  {} as BoardContextProps
);

export const useBoard = () => useContext(BoardContext);

const Board = ({ children }: Props) => {
  const [{ data, fetching }] = useInitQuery();
  const [cards, setCards] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    if (!fetching) {
      setCards(data.cards);
      setLabels(data.labels);
      setLoading(false);
    }
  }, [fetching]);

  const context: BoardContextProps = {
    cards,
    labels,
    setCards,
    setLabels,
    loading,
    setLoading,
    disabled,
    setDisabled,
    selectedLabels,
    setSelectedLabels,
  };

  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};

export default Board;
