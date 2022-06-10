import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { Column, CreateTaskModal } from "components";
import { useBoards } from "contexts";
import { boardsDispatchConstants, useDocumentTitle } from "utilities";
import { FaPlus } from "react-icons/fa";
import {
  Flex,
  Heading,
  IconButton,
  Box,
  Input,
  Tab,
  Tabs,
  TabList,
  Text,
  useColorModeValue,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";

const { CREATE_NEW_COLUMN, DELETE_COLUMN, UPDATE_BOARD } =
  boardsDispatchConstants;

export function TaskBoard() {
  const [taskBoard, setTaskBoard] = useState({});
  const [newColumnName, setNewColumnName] = useState("");
  const { boardId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { boards, boardsApiDispatch, selectedPriority, setSelectedPriority } =
    useBoards();
  const boardTitle = taskBoard?.title ? taskBoard.title : "";
  useDocumentTitle(boardTitle+" | Yorked");
  useEffect(() => {
    const currentBoard = boards?.find(({ _id }) => _id === boardId) || {};
    setTaskBoard(currentBoard);
  }, [boards]);
  const createNewColumn = (e) => {
    e.preventDefault();
    boardsApiDispatch({
      type: CREATE_NEW_COLUMN,
      payload: { boardId: taskBoard._id, column: { title: newColumnName } },
    });
    setNewColumnName("");
  };
  const deleteColumn = (columnId) => {
    boardsApiDispatch({
      type: DELETE_COLUMN,
      payload: { boardId: taskBoard._id, columnId: columnId },
    });
  };
  const updateBoard = (updatedBoard) => {
    boardsApiDispatch({
      type: UPDATE_BOARD,
      payload: updatedBoard,
    });
  };
  const setPriority = (e) => setSelectedPriority(e.target.value);
  const changeHandler = (e) => setNewColumnName(e.target.value);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (destination.droppableId !== source.droppableId) {
      const sourceColumn = taskBoard.columns.find(
        ({ _id }) => _id === source.droppableId
      );
      const destinationColumn = taskBoard.columns.find(
        ({ _id }) => _id === destination.droppableId
      );
      const sourceTaskIds = [...sourceColumn.taskIds];
      let destinationTaskIds = [...destinationColumn.taskIds];

      sourceTaskIds.splice(source.index, 1);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = { ...sourceColumn, taskIds: sourceTaskIds };
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const updatedTasks = taskBoard.tasks.map((task) =>
        task._id === draggableId
          ? {
              ...task,
              columnId: destination.droppableId,
              label: destinationColumn.title,
            }
          : task
      );
      const updatedColumns = taskBoard.columns.map((column) => {
        if (column._id === destinationColumn._id) return newDestinationColumn;
        if (column._id === sourceColumn._id) return newSourceColumn;
        return column;
      });

      const newBoard = {
        ...taskBoard,
        tasks: [...updatedTasks],
        columns: [...updatedColumns],
      };

      updateBoard(newBoard);
      setTaskBoard(newBoard);
      return;
    }

    const reorderedColumn = taskBoard.columns.find(
      ({ _id }) => _id === source.droppableId
    );
    const taskIds = [...reorderedColumn.taskIds];
    taskIds.splice(source.index, 1);
    taskIds.splice(destination.index, 0, draggableId);

    reorderedColumn.taskIds = taskIds;

    const newBoard = {
      ...taskBoard,
      columns: taskBoard.columns.map((column) =>
        column._id === reorderedColumn._id ? reorderedColumn : column
      ),
    };
    updateBoard(newBoard);
    setTaskBoard(newBoard);
  };
  const tabButtons = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Low",
      value: "low",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "High",
      value: "high",
    },
  ];
  const defaultTab = tabButtons.findIndex(
    ({ value }) => value === selectedPriority
  );
  const createTabButton = (btn, idx) => {
    const { label, value } = btn;
    return (
      <Tab
        key={idx}
        onClick={setPriority}
        value={value}
        borderTopLeftRadius={idx === 0 ? 8 : 0}
        borderBottomLeftRadius={idx === 0 ? 8 : 0}
        borderTopRightRadius={idx === 3 ? 8 : 0}
        borderBottomRightRadius={idx === 3 ? 8 : 0}
        _selected={{ color: "white", bg: "primary.light" }}
        bg={useColorModeValue("light.100","dark.200")}
      >
        {label}
      </Tab>
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex align="center" flexWrap="wrap" justifyContent={{base:"center",md:"space-between"}}>
        <Heading as="h2" fontSize="lg">
          {boardTitle}
        </Heading>
        <Flex align="center" gap={2} flexWrap="wrap">
          <Text>Show Priority :</Text>
          <Tabs defaultIndex={defaultTab}>
            <TabList borderBottom="unset">
              {tabButtons.map((btn, idx) => createTabButton(btn, idx))}
            </TabList>
          </Tabs>
        </Flex>
      </Flex>
      <Flex
        gridGap={4}
        bg={useColorModeValue("light.100","dark.200")}
        py={4}
        w="full"
        sx={{
          overflowX: "auto",
        }}
      >
        {taskBoard?.columns &&
          taskBoard.columns.map((column) => {
            const tasks = column.taskIds.map((taskId) =>
              taskBoard.tasks.find(({ _id }) => _id === taskId)
            );
            return (
              <Column
                key={column._id}
                column={column}
                tasks={tasks}
                deleteColumn={deleteColumn}
              />
            );
          })}
        <Box
          p={1}
          bg={useColorModeValue("light.200","dark.100")}
          borderRadius={8}
          height="fit-content"
        >
          <form onSubmit={createNewColumn}>
            <Input
              minWidth="xs"
              width="xs"
              variant="flushed"
              value={newColumnName}
              onChange={changeHandler}
              placeholder="Create new column"
            />
          </form>
        </Box>
      </Flex>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={onClose}
        columns={taskBoard.columns}
        boardId={taskBoard._id}
      />
      <IconButton
        onClick={onOpen}
        position="fixed"
        bottom={8}
        rounded="full"
        bg="primary.light"
        right={8}
      >
        <FaPlus />
      </IconButton>
    </DragDropContext>
  );
};