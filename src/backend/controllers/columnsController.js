import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";
/**
 * This handler handles creating a new Column
 * send POST Request at /api/boards/:boardId/columns
 * body contains {column}
 * */

export const createColumnHandler = function (schema, request) {
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
    const { column } = JSON.parse(request.requestBody);

    const { boardId } = request.params;
    const board = user.boards.find((board) => board._id === boardId);
    board.columns.push({ ...column, _id:uuid(), taskIds:[] });

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
 * This handler handles updating a Column
 * send DELETE Request at /api/boards/:boardId/columns/:columnId
 * */
 export const deleteColumnHandler = function (schema, request) {
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
    const { boardId, columnId } = request.params;
    const board = user.boards.find((board) => board._id === boardId);

    const columnToRemove = board.columns.find(({_id})=>_id === columnId);

    columnToRemove.taskIds.forEach(taskId => { //To remove all the tasks associated with the column
      board.tasks = board.tasks.filter(({_id})=> _id !== taskId)
    })
    board.columns = board.columns.filter(({_id}) => _id !== columnId ); // To remove the column from 'columns' property of board
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { boards: user.boards });
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
