import React, { useContext, useEffect, useState } from "react";
import { Board, useDeletedBoardsQuery } from "../generated/graphql";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

type RecycleBinProps = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  loading: boolean;
  error: boolean;
};

const RecycleBinContext = React.createContext({} as RecycleBinProps);

export const useRecycleBin = () => useContext(RecycleBinContext);

const RecycleBin = ({ children }: Props) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [{ data, fetching }] = useDeletedBoardsQuery();

  useEffect(() => {
    if (!fetching) {
      setLoading(false);

      if (error) {
        setError(true);
      } else {
        setBoards(data.deletedBoards);
      }
    }
  }, [fetching]);

  const context: RecycleBinProps = {
    boards,
    setBoards,
    loading,
    error,
  };

  return (
    <RecycleBinContext.Provider value={context}>
      {children}
    </RecycleBinContext.Provider>
  );
};

export default RecycleBin;
