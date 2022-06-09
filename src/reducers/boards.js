import { boardsDispatchConstants } from "utilities";
const {
  GET_ALL_BOARDS,
  CREATE_NEW_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_NEW_COLUMN,
  DELETE_COLUMN,
} = boardsDispatchConstants;
export const boardsReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOARDS:
      return({
        ...state,
        url:"/user/boards",
        method:"get",
        data:{}
      })
    case CREATE_NEW_BOARD:
      return {
        ...state,
        url: "/user/boards",
        method: "post",
        data: {
          board: payload,
        },
      };
    case UPDATE_BOARD:
      return {
        ...state,
        url: `/user/boards/${payload._id}`,
        method: "post",
        data: {
          board: payload,
        },
      };
    case DELETE_BOARD:
      return {
        ...state,
        url: `/user/boards/${payload}`,
        method: "delete",
        data: {},
      };
    case CREATE_NEW_TASK:
      return {
        ...state,
        url: `/user/boards/${payload.boardId}/tasks`,
        method: "post",
        data: { task: payload.newTask },
      };
    case UPDATE_TASK:
      return {
        ...state,
        url: `/user/boards/${payload.boardId}/tasks/${payload.task._id}`,
        method: "post",
        data: { updatedTask: payload.task },
      };
    case DELETE_TASK:
      return {
        ...state,
        url: `/user/boards/${payload.boardId}/tasks/${payload.taskId}`,
        method: "delete",
        data: {},
      };
    case CREATE_NEW_COLUMN:
      return {
        ...state,
        url: `/user/boards/${payload.boardId}/columns`,
        method: "post",
        data: {
          column: payload.column,
        },
      };
    case DELETE_COLUMN:
      return {
        ...state,
        url: `/user/boards/${payload.boardId}/columns/${payload.columnId}`,
        method: "delete",
        data: {},
      };
  }
};
