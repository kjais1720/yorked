import { v4 as uuid } from "uuid";
import { useBoards } from "contexts";
import { boardsDispatchConstants } from "utilities";
const { CREATE_NEW_TASK } = boardsDispatchConstants;
import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Markdown } from "components";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const defaultTaskDetails = {
  title: "",
  subTasks: [],
  priority: "low",
  columnId: "",
  description: "",
};

export function CreateTaskModal({ isOpen, onClose, columns, boardId }) {
  const [taskDetails, setTaskDetails] = useState(defaultTaskDetails);
  const [newSubTask, setNewSubTask] = useState("");
  const [markdown, setMarkdown] = useState({
    show: false,
    text: "",
  });
  const { boardsApiDispatch } = useBoards();

  useEffect(() => {
    const defaultColumnId = columns && columns[0]._id;
    setTaskDetails((prev) => ({ ...prev, columnId: defaultColumnId })); //To set the default column as the first column if user doesn't specifically selects one
  }, [columns]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setMarkdown((prev) => ({
        ...prev,
        text: value,
      }));
    }
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const subTaskChangeHandler = (e) => setNewSubTask(e.target.value);

  const createNewSubtask = () => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks
        ? [...prev.subTasks, { id: uuid(), title: newSubTask, checked: false }]
        : [{ title: newSubTask, checked: false }],
    }));
    setNewSubTask("");
  };
  const removeSubTask = (taskTitle) => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter(({ title }) => title != taskTitle),
    }));
  };
  const createNewTask = (e) => {
    e.preventDefault();
    if(taskDetails.title){
      boardsApiDispatch({
        type: CREATE_NEW_TASK,
        payload: {
          newTask: taskDetails,
          boardId,
        },
      });
      setTaskDetails(defaultTaskDetails);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" p={8}>
      <ModalOverlay p={8} />
      <ModalContent p={8}>
        <ModalCloseButton />
        <ModalHeader>Add a New Task</ModalHeader>
        <ModalBody display="flex" flexDirection="column" gridGap={4}>
          <form onSubmit={createNewTask}>
            <FormControl>
              <FormLabel htmlFor="task-title" color="gray.500">
                Title:
              </FormLabel>
              <Input
                name="title"
                value={taskDetails.title}
                onChange={inputHandler}
                id="task-title"
                type="text"
                variant="flushed"
              />
            </FormControl>
            <Flex gap={4} my={2}>
              <FormControl display="flex" alignItems="center">
                <FormLabel color="gray.500">Priority:</FormLabel>
                <Select
                  name="priority"
                  value={taskDetails.priority}
                  onChange={inputHandler}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel color="gray.500">Column:</FormLabel>
                <Select
                  name="columnId"
                  value={taskDetails.column}
                  onChange={inputHandler}
                >
                  {columns?.length &&
                    columns.map(({ title, _id }) => (
                      <option key={_id} value={_id}>
                        {title}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel htmlFor="subTask" color="gray.500">
                Sub Taks:
              </FormLabel>
              <Flex mb={4}>
                <Input
                  name="subtasks"
                  value={newSubTask}
                  onChange={subTaskChangeHandler}
                  id="subTask"
                  type="text"
                  variant="flushed"
                  name="subTasks"
                />
                <IconButton onClick={createNewSubtask}>
                  <FaPlus />
                </IconButton>
              </Flex>
              {taskDetails.subTasks
                ? taskDetails.subTasks.map(({ title }, idx) => (
                    <Flex key={idx} w="full">
                      <p key={idx}>{title}</p>
                      <IconButton
                        ml="auto"
                        bg="transparent"
                        onClick={() => removeSubTask(title)}
                      >
                        <FaTimes />
                      </IconButton>
                    </Flex>
                  ))
                : ""}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description" color="gray.500">
                Description: (supports markdown)
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                value={taskDetails.description}
                size="sm"
                resize={"vertical"}
                onChange={inputHandler}
                onFocus={() => setMarkdown((prev) => ({ ...prev, show: true }))}
                onBlur={() => setMarkdown((prev) => ({ ...prev, show: false }))}
              />
              {markdown.show && (
                <Box marginY={4}>
                  <Heading
                    as="h2"
                    color="gray.500"
                    marginBottom={2}
                    fontSize="md"
                  >
                    Live Preview:{" "}
                  </Heading>
                  <Markdown markdownText={markdown.text} />
                </Box>
              )}
            </FormControl>
            <Box textAlign="right">
              <Button type="submit" variant="solid" colorScheme="blue">
                Add
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
      <div className="title"></div>
    </Modal>
  );
}
