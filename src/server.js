import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
} from "./backend/controllers/NotesController";
import {
  getAllBoardsHandler,
  createBoardHandler,
  updateBoardHandler,
  deleteBoardHandler,
} from "backend/controllers/boardsController";
import {
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "backend/controllers/tasksController";
import {
  createColumnHandler,
  deleteColumnHandler,
} from "backend/controllers/columnsController";
import {
  getAllPomoTasksHandler,
  createPomoTaskHandler,
  updatePomoTaskHandler,
  deletePomoTaskHandler,
} from "./backend/controllers/PomoTasksController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model,
      boards: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          boards: item.boards,
          notes: [],
          archives: [],
          pomoTasks: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      //boards routes (private)
      this.get("/user/boards", getAllBoardsHandler.bind(this));
      this.post("/user/boards", createBoardHandler.bind(this));
      this.post("/user/boards/:boardId", updateBoardHandler.bind(this));
      this.delete("/user/boards/:boardId", deleteBoardHandler.bind(this));

      //task routes (private)
      this.post("/user/boards/:boardId/tasks", createTaskHandler.bind(this));
      this.post(
        "/user/boards/:boardId/tasks/:taskId",
        updateTaskHandler.bind(this)
      );
      this.delete(
        "/user/boards/:boardId/tasks/:taskId",
        deleteTaskHandler.bind(this)
      );

      //column routes (private)
      this.post(
        "/user/boards/:boardId/columns",
        createColumnHandler.bind(this)
      );
      this.delete(
        "/user/boards/:boardId/columns/:columnId",
        deleteColumnHandler.bind(this)
      );

      this.get("/user/pomodoro/tasks", getAllPomoTasksHandler.bind(this));
      this.post("/user/pomodoro/tasks", createPomoTaskHandler.bind(this));
      this.post("/user/pomodoro/tasks/:taskId", updatePomoTaskHandler.bind(this));
      this.delete("/user/pomodoro/tasks/:taskId", deletePomoTaskHandler.bind(this));

      // notes routes (private)
      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.delete("/notes/:noteId", deleteNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));

      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );
    },
  });
  return server;
}
