import React, { useContext, useEffect, useState } from "react";
import { Board, useBoardsQuery } from "../generated/graphql";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

type HomeContextProps = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  loading: boolean;
};

const HomeContext = React.createContext({} as HomeContextProps);

export const useHome = () => useContext(HomeContext);

const Home = ({ children }: Props) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [{ data, fetching }] = useBoardsQuery();

  useEffect(() => {
    if (!fetching) {
      setBoards(data.boards);
      setLoading(false);
    }
  }, [fetching]);

  const context: HomeContextProps = {
    boards,
    setBoards,
    loading,
  };

  return (
    <HomeContext.Provider value={context}>{children}</HomeContext.Provider>
  );
};

export default Home;
