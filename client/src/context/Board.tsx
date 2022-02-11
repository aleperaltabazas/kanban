import React, { useContext, useEffect, useState } from "react";
import { Board, Card, Label, useBoardDataQuery } from "../generated/graphql";

interface Props {
  boardFetch: { type: "ID"; id: string } | { type: "ALIAS"; alias: string };
  children: JSX.Element | JSX.Element[];
}

type BoardContextProps = {
  board: Board;
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

const Board = ({ children, boardFetch }: Props) => {
  const [{ data, fetching }] = useBoardDataQuery({
    variables:
      boardFetch.type == "ID"
        ? { boardId: boardFetch.id }
        : { boardAlias: boardFetch.alias },
  });
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState<Board>();
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    if (!fetching) {
      data.board;
      setCards(data.cards);
      setLabels(data.labels);
      setBoard(data.board as Board);
      setLoading(false);
    }
  }, [fetching]);

  const context: BoardContextProps = {
    board,
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
