import { pomodoroDispatchConstants } from "utilities";
const { CREATE_NEW_POMO_TASK, UPDATE_POMO_TASK, DELETE_POMO_TASK } =
  pomodoroDispatchConstants;

export const pomodoroReducer = (state, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_POMO_TASK:
      return {
        ...state,
        url: "/user/pomodoro/tasks",
        method: "post",
        data: {task:payload},
      };
    case UPDATE_POMO_TASK:
      return {
        ...state,
        url: `/user/pomodoro/tasks/${payload._id}`,
        method: "post",
        data: {updatedTask:payload},
      };

    case DELETE_POMO_TASK:
      return {
        ...state,
        url: `/user/pomodoro/tasks/${payload}`,
        method: "delete",
        data: {},
      };
    default:
      return state;
  }
};
