import { Children } from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { pomodoroReducer } from "reducers";
import { useAxios } from "utilities";

const PomodoroContext = createContext({ tasks: [] });

export const usePomodoro = () => useContext(PomodoroContext);

export function PomodoroProvider({ children }) {
  const [pomodoroState, pomodoroDispatch] = useReducer(pomodoroReducer, {
    url: "/user/pomodoro/tasks",
    method: "get",
    data: {},
  });
  const [pomoTasks, setPomoTasks] = useState([]);

  const { serverResponse, serverError, isLoading } = useAxios(pomodoroState);
  useEffect(() => {
    if (serverResponse?.status === 200 || serverResponse?.status === 201) {
      const {
        data: { pomoTasks },
      } = serverResponse;
      setPomoTasks(pomoTasks);
    }
  }, [serverError, serverResponse, isLoading]);
  return (
    <PomodoroContext.Provider value={{ pomoTasks, pomodoroDispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
}
