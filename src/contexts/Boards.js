import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { useAxios } from "utilities";
import { boardsReducer } from "reducers";
import { useAuth } from "contexts";
import { boardsDispatchConstants } from "utilities";
const { GET_ALL_BOARDS} = boardsDispatchConstants;

const BoardsContext = createContext({});

export const useBoards = () => useContext(BoardsContext);

export function BoardsProvider({children}){
  const [boardsApiState, boardsApiDispatch] = useReducer(boardsReducer,{
    url:"/user/boards",
    method:"",
    data:{}
  })
  const [boards, setBoards] = useState([])
  const [selectedPriority, setSelectedPriority ] = useState("all");
  const { userState :{isLoggedIn} } = useAuth();
  const { serverResponse, serverError, isLoading } = useAxios(boardsApiState);

  useEffect(()=>{
    if(isLoggedIn){
      boardsApiDispatch({type:GET_ALL_BOARDS})
    }
  },[isLoggedIn])

  useEffect(()=>{
    if(serverResponse?.status === 200 || serverResponse?.status === 201){
      const {data:{boards}} = serverResponse;
      setBoards(boards)
    }
  },
  [serverResponse, serverError]);
  return(
    <BoardsContext.Provider value={{ boards, boardsApiDispatch, isLoading, selectedPriority, setSelectedPriority }}>
      {children}
    </BoardsContext.Provider>
  )
}
