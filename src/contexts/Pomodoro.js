import { Children } from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { pomodoroReducer } from "reducers";
import { pomodoroDispatchConstants, useAxios } from "utilities";
const { CREATE_NEW_POMO_TASK, UPDATE_POMO_TASK, DELETE_POMO_TASK } =
  pomodoroDispatchConstants;

  const PomodoroContext = createContext({ tasks: [] });

export const usePomodoro = () => useContext(PomodoroContext);

export function PomodoroProvider({ children }) {
  const [pomodoroState, pomodoroDispatch] = useReducer(pomodoroReducer, {
    url: "/user/pomodoro/tasks",
    method: "get",
    data: {},
  });
  const [pomoTasks, setPomoTasks] = useState([]);

  const deleteTask = (taskId) => {
    pomodoroDispatch({ type: DELETE_POMO_TASK, payload: taskId });
  };

  const setActiveTask = (taskId) => {
    const currentActiveTask = pomoTasks.find(({ isActive }) => isActive);
    const taskToSetActive = pomoTasks.find(({ _id }) => _id === taskId);
    pomodoroDispatch({
      type: UPDATE_POMO_TASK,
      payload: { ...currentActiveTask, isActive: false },
    });
    setTimeout(() =>
      //to run the second dispatch only after the data from first dispatch is loaded
      pomodoroDispatch({
        type: UPDATE_POMO_TASK,
        payload: { ...taskToSetActive, isActive: true },
      })
    );
  };

  const updateTask = (newTask) => {
    pomodoroDispatch({
      type: UPDATE_POMO_TASK,
      payload: newTask,
    })
  }

  const checkUncheckTask = (taskId) => {
    const taskToEdit = pomoTasks.find(({_id}) => _id === taskId)
    pomodoroDispatch({
      type:UPDATE_POMO_TASK,
      payload:{...taskToEdit,isDone:!taskToEdit.isDone}
    })
  }

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
    <PomodoroContext.Provider value={{ pomoTasks, pomodoroDispatch, deleteTask, setActiveTask, updateTask, checkUncheckTask }}>
      {children}
    </PomodoroContext.Provider>
  );
}
