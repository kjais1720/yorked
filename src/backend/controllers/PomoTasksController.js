import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * This handler handles gets all boards in the db.
 * send GET Request at /api/pomodoro/tasks
 * */

 export const getAllPomoTasksHandler = function (schema, request) {
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
  return new Response(200, {}, { pomoTasks: user.pomoTasks });
};


/**
 * This handler handles creating a new Pomodoro Task
 * send POST Request at /api/user/pomodoro/tasks
 * body contains {task}
 * */

export const createPomoTaskHandler = function (schema, request) {
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

    user.pomoTasks.push({...task,_id:uuid()})

    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { pomoTasks: user.pomoTasks });
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
 * send POST Request at /api/user/pomodoro/tasks/:taskId
 * body contains {task}
 * */

export const updatePomoTaskHandler = function (schema, request) {
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
    const { taskId:updatedTaskId } = request.params;
    user.pomoTasks = user.pomoTasks.map(task=> task._id=== updatedTaskId ? updatedTask : task)
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { pomoTasks: user.pomoTasks });
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
 * send DELETE Request at /api/pomodoro/tasks/:taskId
 * */
export const deletePomoTaskHandler = function (schema, request) {
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
    const { taskId } = request.params;
    user.pomoTasks = user.pomoTasks.filter(({ _id }) => _id !== taskId); // To remove the task from 'tasks' property of board
    console.log(taskId)
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { pomoTasks: user.pomoTasks });
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
