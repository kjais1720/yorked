import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import { boards } from "backend/db/boards";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    boards:boards,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
