import React from "react";
import Loader from "../components/commons/Loader";
import { Card, Label, useCardsQuery } from "../generated/graphql";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type CardsContextProps = {
  cards: Array<Card>;
  labels: Array<Label>;
};

export const CardsContext = React.createContext<CardsContextProps>({
  cards: [],
  labels: [],
});

const Cards = ({ children }: Props) => {
  const [{ data, fetching }] = useCardsQuery();

  if (fetching) {
    return (
      <div className="h-100 w-100 center">
        <Loader />
      </div>
    );
  }

  return (
    <CardsContext.Provider
      value={{ cards: data.cards, labels: data.cards.flatMap((c) => c.labels) }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default Cards;
