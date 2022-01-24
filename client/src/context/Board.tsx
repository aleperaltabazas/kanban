import React, { useEffect, useState } from "react";
import Loader from "../components/commons/Loader";
import { Card, Label, useCardsQuery, useInitQuery } from "../generated/graphql";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type BoardContextProps = {
  cards: Array<Card>;
  setCards: (cards: Array<Card>) => void;
  labels: Array<Label>;
  setLabels: (labels: Array<Label>) => void;
};

export const BoardContext = React.createContext<BoardContextProps>({
  cards: [],
  setCards: () => {},
  labels: [],
  setLabels: () => {},
});

const Board = ({ children }: Props) => {
  const [{ data, fetching }] = useInitQuery();
  const [cards, setCards] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fetching) {
      setCards(data.cards);
      setLabels(data.labels);
      setLoading(false);
    }
  });

  return (
    <BoardContext.Provider value={{ cards, labels, setCards, setLabels }}>
      {loading ? (
        <div className="h-100 w-100 center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </BoardContext.Provider>
  );
};

export default Board;
