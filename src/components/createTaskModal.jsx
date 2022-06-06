import { v4 as uuid } from "uuid"
import { useBoards } from "contexts";
import { boardsDispatchConstants } from "utilities";
import { Quill } from "components"
const { CREATE_NEW_TASK } = boardsDispatchConstants;

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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

import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const defaultTaskDetails = {
  title: "",
  subTasks: [],
  priority: "",
  columnId: "",
  description: "",
};

export function CreateTaskModal({ isOpen, onClose, columns, boardId }) {
  const [taskDetails, setTaskDetails] = useState(defaultTaskDetails);
  const [newSubTask, setNewSubTask] = useState("");
  const { boardsApiDispatch } = useBoards();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const subTaskChangeHandler = (e) => setNewSubTask(e.target.value);

  const createNewSubtask = () => {
    // const upudatedSubTasks = taskDetails.subTasks?.map() || [];
    
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks
        ? [...prev.subTasks, { id:uuid(),title: newSubTask, checked: false }]
        : [{ title: newSubTask, checked: false }],
    }));
    setNewSubTask("")
  };
  const removeSubTask = (taskTitle) => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter(({ title }) => title != taskTitle),
    }));
  };
  const createNewTask = (e) => {
    e.preventDefault();
    boardsApiDispatch({
      type: CREATE_NEW_TASK,
      payload: {
        newTask: taskDetails,
        boardId,
      },
    });
    setTaskDetails(defaultTaskDetails);
    onClose();
  };
  const setDescription = value => setTaskDetails(prev=> ({...prev,description:value}))

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
                      <IconButton ml="auto" bg="transparent" onClick={() => removeSubTask(title)}>
                        <FaTimes />
                      </IconButton>
                    </Flex>
                  ))
                : ""}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description" color="gray.500">
                Description
              </FormLabel>
              {/* <Textarea
                id="description"
                size="sm"
                resize={"vertical"}
                onChange={inputHandler}
              /> */}
          <Quill text={taskDetails.description} onChange={setDescription} />
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
