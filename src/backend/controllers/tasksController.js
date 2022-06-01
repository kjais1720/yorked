import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";
/**
 * This handler handles creating a new Task
 * send POST Request at /api/boards/:boardId/tasks
 * body contains {task}
 * */

export const createTaskHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { task } = JSON.parse(request.requestBody);

    const { columnId } = task;
    const uniqueId = uuid();
    const { boardId } = request.params;
    console.log({ task, columnId });
    const taskBoard = user.boards.find((board) => board._id === boardId);
    taskBoard.tasks.push({ ...task, _id:uniqueId });
    const taskColumn = taskBoard.columns?.find(
      (column) => column._id === columnId
    ) || [] ;
    taskColumn.taskIds.push(uniqueId);

    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { boards: user.boards });
  } catch (error) {
    console.log({ error });
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a Task
 * send POST Request at /api/boards/:boardId/tasks/:taskId
 * body contains {task}
 * */

export const updateTaskHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { updatedTask } = JSON.parse(request.requestBody);
    const { columnId } = updatedTask;
    const { boardId, taskId } = request.params;
    const board = user.boards.find((board) => board._id === boardId);
    board.tasks.forEach((task) => {
      if (task._id === taskId) {
        task = { ...updatedTask };
      }
    });

    board.columns.forEach((column) => {
      column.taskIds = column.taskIds.filter((id) => id !== taskId);
      if (column._id === columnId) {
        column.taskIds.push(taskId);
      }
    });

    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { boards: user.boards });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a Task
 * send DELETE Request at /api/boards/:boardId/tasks/:taskId
 * */
export const deleteTaskHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { boardId, taskId } = request.params;
    const board = user.boards.find((board) => board._id === boardId);
    board.tasks = board.tasks.filter(({ _id }) => _id !== taskId); // To remove the task from 'tasks' property of board
    board.columns.forEach((column) => {
      // To remove the task from the columns of the board
      column.taskIds = column.taskIds.filter((id) => id !== taskId);
    });

    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { boards: user.boards });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
