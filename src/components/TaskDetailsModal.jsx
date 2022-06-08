import { v4 as uuid } from "uuid";
import {
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import { useBoards } from "contexts";
import { Quill } from "components";
import { FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { boardsDispatchConstants } from "utilities";
const { UPDATE_TASK, DELETE_TASK } = boardsDispatchConstants;

export function TaskDetailsModal({ task, isOpen, onClose }) {
  const [taskDetails, setTaskDetails] = useState({});
  const { boards, boardsApiDispatch } = useBoards();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [newSubTask, setNewSubTask] = useState("");
  const columns = boards?.find(({ _id }) => _id === boardId)?.columns;
  useEffect(() => {
    if (task.title) setTaskDetails({ ...task, subTasks: [...task.subTasks] });
  }, [task]);
  const subTaskChangeHandler = (e) => setNewSubTask(e.target.value);

  const createNewSubtask = () => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks
        ? [...prev.subTasks, { id: uuid(), title: newSubTask, checked: false }]
        : [{ id: uuid(), title: newSubTask, checked: false }],
    }));
    setNewSubTask("");
  };
  const removeSubTask = (subTaskId) => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter(({ id }) => id != subTaskId),
    }));
  };
  const checkSubTask = (id) => {
    setTaskDetails((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, checked: !subTask.checked } : subTask
      ),
    }));
  };

  const startPomodoro = (taskTitle) => {
    navigate("/pomodoro",{state:{taskTitle}})
  }

  function updateTitle(value) {
    setTaskDetails((prev) => ({ ...prev, title: value }));
  }

  const optionClickHandler = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const updateTask = () => {
    boardsApiDispatch({
      type: UPDATE_TASK,
      payload: {
        task: taskDetails,
        boardId,
      },
    });
    onClose();
  };

  const deleteTask = () => {
    boardsApiDispatch({
      type: DELETE_TASK,
      payload: {
        taskId: taskDetails._id,
        boardId,
      },
    });
    onClose();
  };
  const [isEditing, setIsEditing] = useState(false);
  const { title, subTasks, description } = taskDetails;

  return (
    <SlideFade in={isOpen} offsetY="15rem">
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="full" maxWidth="3xl" py={8}>
          <ModalCloseButton />
          <ModalHeader>
            <FormControl>
              <FormLabel color="gray.500">Title:</FormLabel>
              <Editable
                fontSize="2xl"
                fontWeight="semibold"
                defaultValue={title}
                border="2px"
                borderColor="transparent"
                borderRadius={8}
                _hover={{ borderColor: "primary.light" }}
                selectAllOnFocus={false}
                onChange={updateTitle}
                value={title}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </FormControl>
          </ModalHeader>
          <ModalBody>
            <Flex mb={4} gap={4}>
              <Stack gap={8} flexGrow={1}>
                <FormControl>
                  <FormLabel color="gray.500">Checklist:</FormLabel>
                  {subTasks
                    ? subTasks.map(({ id, title, checked }) => (
                        <Flex key={id} w="full">
                          <Checkbox
                            defaultChecked={checked}
                            onChange={() => checkSubTask(id)}
                          >
                            <p
                              color={checked ? "gray.500" : "gray.800"}
                              style={{
                                textDecoration: checked ? "line-through" : "",
                              }}
                            >
                              {title}
                            </p>
                          </Checkbox>
                          <IconButton
                            ml="auto"
                            bg="transparent"
                            onClick={() => removeSubTask(id)}
                          >
                            <FaTimes />
                          </IconButton>
                        </Flex>
                      ))
                    : ""}
                  <Flex>
                    <Input
                      name="subtasks"
                      value={newSubTask}
                      onChange={subTaskChangeHandler}
                      id="subTask"
                      type="text"
                      variant="flushed"
                      placeholder="Create new subtask"
                    />
                    <IconButton onClick={createNewSubtask}>
                      <FaPlus />
                    </IconButton>
                  </Flex>
                </FormControl>
              </Stack>
              <Stack gap={4}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel color="gray.500">Priority:</FormLabel>
                  <Select
                    name="priority"
                    value={taskDetails.priority}
                    onChange={optionClickHandler}
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
                    value={taskDetails.columnId}
                    onChange={optionClickHandler}
                  >
                    {columns &&
                      columns.map(({ title, _id }) => (
                        <option key={_id} value={_id}>
                          {title}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </Stack>
            </Flex>
            <FormControl>
              <FormLabel color="gray.500">Description:</FormLabel>
              {isEditing || (
                <Text
                  border="1px"
                  borderRadius={8}
                  p={4}
                  borderColor="gray.600"
                  onClick={() => setIsEditing(true)}
                >
                  {description}
                </Text>
              )}
              {isEditing && (
                <div>
                  <Quill text={description} as={EditableInput} />
                  <Flex gap={2} my={2}>
                    <IconButton onClick={() => setIsEditing(false)}>
                      <FaCheck />
                    </IconButton>
                    <IconButton onClick={() => setIsEditing(false)}>
                      <FaTimes />
                    </IconButton>
                  </Flex>
                </div>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button marginRight="auto" colorScheme="blue" onClick={()=>{startPomodoro(title)}}>
              Start Working
            </Button>
            <Button mx={2} onClick={deleteTask} colorScheme="red">
              Delete
            </Button>
            <Button onClick={updateTask} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
        <div className="title"></div>
      </Modal>
    </SlideFade>
  );
}
