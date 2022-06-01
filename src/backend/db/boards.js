import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const boards = [
  {
    _id: uuid(),
    title: "Board 1",
    tasks: [
      {
        _id: "t1",
        title: "This is task 1",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t2",
        title: "This is task 2",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "high",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t3",
        title: "This is task 3",
        description: "This is a small description",
        subTasks: [],
        priority: "medium",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t4",
        title: "This is task 4",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: true,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t5",
        title: "This is task 5",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t6",
        title: "This is task 6",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "high",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t7",
        title: "This is task 7",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "medium",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t8",
        title: "This is task 8",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "medium",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t9",
        title: "This is task 9",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
    ],
    columns: [
      {
        _id: "column1",
        title: "To do",
        taskIds: ["t1", "t2", "t3"],
      },
      {
        _id: "column2",
        title: "In Progress",
        taskIds: ["t4", "t5", "t6"],
      },      {
        _id: "column3",
        title: "Done",
        taskIds: ["t7", "t8", "t9"],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Board 2",
    tasks: [
      {
        _id: "t1",
        title: "This is task 1",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t2",
        title: "This is task 2",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "high",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t4",
        title: "This is task 4",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: true,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t5",
        title: "This is task 5",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t7",
        title: "This is task 7",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "medium",
        label: "To do",
        dateAdded: "20-08-22",
      },
      {
        _id: "t9",
        title: "This is task 9",
        description: "This is a small description",
        subTasks: [
          {
            title: "Sub task 1",
            checked: false,
          },
          {
            title: "Sub taks 2",
            checked: false,
          },
        ],
        priority: "low",
        label: "To do",
        dateAdded: "20-08-22",
      },
    ],
    columns: [
      {
        _id: "column1",
        title: "To do",
        taskIds: ["t1", "t2"],
      },
      {
        _id: "column2",
        title: "In Progress",
        taskIds: ["t4", "t5"],
      },      {
        _id: "column3",
        title: "Done",
        taskIds: ["t7", "t9"],
      },
    ],
  }
];
