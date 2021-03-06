import { useState, useReducer, useEffect } from "react";
import { PomoTaskForm, EditPomoTaskPopover } from "components";
import { usePomodoro } from "contexts";

import {
  Box,
  Flex,
  Stack,
  Button,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
export function Task({ task }) {
  const { _id, title, estimatedPomos, completedPomos, isActive, isDone } = task;
  const { setActiveTask, checkUncheckTask } = usePomodoro();

  return (
    <Stack
      p={{base:0, md:4}}
      borderRadius={8}
      bg={useColorModeValue("light.200", "dark.100")}
      borderLeft={isActive ? "solid 5px" : "none"}
      borderLeftColor="primary.light"
      color={
        isDone
          ? "gray.400"
          : useColorModeValue("gray.600", "gray.100")
      }
    >
      <Flex gap={{base:2, md:4}} align="center">
        <IconButton
          color={
            isDone
              ? "primary.light"
              : useColorModeValue("gray.600","gray.100")
          }
          onClick={() => checkUncheckTask(task._id)}
          bg="transparent"
          p={0}
          fontSize="xl"
        >
          <FaCheckCircle />
        </IconButton>
        <Heading
          textDecoration={isDone ? "line-through" : "none"}
          fontSize="xl"
          paddingY={2}
          onClick={() => setActiveTask(_id)}
        >
          {title}
        </Heading>
        <Flex marginLeft="auto" gap={2}>
          <Text marginLeft="auto" paddingY={2}>
            {completedPomos}/{estimatedPomos}
          </Text>
          <EditPomoTaskPopover taskToEdit={task} />
        </Flex>
      </Flex>
    </Stack>
  );
}

export function PomoTasks() {
  const [showTaskModal, toggleShowTaskModal] = useReducer(
    (state) => !state,
    false
  );
  const location = useLocation();
  const [taskFromBoard, setTaskFromBoard] = useState(
    location.state?.taskTitle ?? ""
  );

  useEffect(() => {
    if (taskFromBoard) {
      toggleShowTaskModal();
      location.state = {};
    }
  }, [taskFromBoard]);
  const clearTaskFromBoard = () => setTaskFromBoard("");
  const { pomoTasks, deleteTask, setActiveTask, checkUncheckTask } =
    usePomodoro();

  return (
    <Stack
      color={useColorModeValue("gray.600","light.200")}
      flexBasis="500px"
      p={{base:0, md:4}}
      borderRadius={8}
      flex={1.5}
      bg={useColorModeValue("light.100","dark.200")}
      height="100%"
      max-height="83vh"
      gap={2}
    >
      <Heading as="h2" textAlign="center">
        Tasks
      </Heading>
      {showTaskModal ? (
        <PomoTaskForm
          taskFromBoard={taskFromBoard}
          closeModal={toggleShowTaskModal}
          clearTaskFromBoard={clearTaskFromBoard}
        />
      ) : (
        <Button bg={useColorModeValue("light.200","dark.100")} onClick={toggleShowTaskModal}>
          <FaPlusCircle />{" "}
          <Box as="span" ml={1}>
            Add Task
          </Box>
        </Button>
      )}
      <Stack gap={2} overflowY="auto" maxHeight="50vh">
        {pomoTasks.map((task) => (
          <Task setActive={setActiveTask} key={task._id} task={task} />
        ))}
      </Stack>
    </Stack>
  );
}
