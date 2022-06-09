import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePomodoro } from "contexts";
import { pomodoroDispatchConstants } from "utilities";
const { CREATE_NEW_POMO_TASK } =
  pomodoroDispatchConstants;

export function PomoTaskForm({ taskFromBoard, closeModal, clearTaskFromBoard }) {
  const [newTask, setNewTask] = useState({ title: taskFromBoard, estimatedPomos: 1, completedPomos:0, isDone:false });
  const { pomodoroDispatch } = usePomodoro();
  useEffect(()=>()=>clearTaskFromBoard(),[])
  const createTask = () => {
    pomodoroDispatch({
      type: CREATE_NEW_POMO_TASK,
      payload: {...newTask},
    });
    closeModal();
  };

  const updateNewTask = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const updateEstimatedPomos = (newValue) => {
    setNewTask((prev) => ({ ...prev, estimatedPomos: newValue }));
  };
  return (
    <Stack borderRadius={8} p={4} bg={useColorModeValue("light.200","dark.100")}>
      <FormControl>
        <FormLabel>What you want to do:</FormLabel>
        <Input
          name="title"
          value={newTask.title}
          onChange={updateNewTask}
          variant="flushed"
          borderColor="gray.400"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Estimated Pomodoros:</FormLabel>
        <NumberInput
          name="estimatedPomos"
          onChange={updateEstimatedPomos}
          defaultValue={1}
          min={0}
          borderColor="gray.400"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Flex gap={2} justify="end">
        <Button onClick={closeModal} colorScheme="gray">
          Cancel
        </Button>
        <Button onClick={createTask} colorScheme="green">
          Save
        </Button>
      </Flex>
    </Stack>
  );
}
