import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all boards in the db.
 * send GET Request at /api/boards
 * */

export const getAllBoardsHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  console.log(user)
  return new Response(200, {}, { boards: user.boards });
};

/**
 * This handler handles creating a new board
 * send POST Request at /api/boards
 * body contains {board}
 * */

export const createBoardHandler = function (schema, request) {
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
    const { board } = JSON.parse(request.requestBody);
    user.boards.push(
      { 
        ...board, 
        _id: uuid(), 
        columns:[
          {
            _id: "column1",
            title: "To do",
            taskIds: [],
          },
          {
            _id: "column2",
            title: "In Progress",
            taskIds: [],
          },
          {
            _id: "column3",
            title: "Done",
            taskIds: [],
          },    
        ], 
        tasks:[] 
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
 * This handler handles creating a new board
 * send DELETE Request at /api/boards/:boardId
 * */

export const deleteBoardHandler = function (schema, request) {
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
    const boardId = request.params.boardId;
    const newBoard = user.boards.filter((item) => item._id !== boardId);
    user.boards = newBoard; 
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

/**
 * This handler handles updating a board
 * send POST Request at /api/boards/:boardId
 * body contains {board}
 * */

export const updateBoardHandler = function (schema, request) {
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
    const { board } = JSON.parse(request.requestBody);
    const { boardId } = request.params;
    const boardIndex = user.boards.findIndex((board) => board._id === boardId);
    user.boards[boardIndex] = { ...user.boards[boardIndex], ...board };
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
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

export const archiveNoteHandler = function (schema, request) {
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
    const { noteId } = request.params;
    const archivedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.archives.push({ ...archivedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes }
    );
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
