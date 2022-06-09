import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ButtonGroup,
  IconButton,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  Button,
  Box,
  Popover,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
import { EditIcon } from "@chakra-ui/icons"
import React, {useState} from "react";
import { usePomodoro } from 'contexts';
import { deleteTaskHandler, updateTaskHandler } from 'backend/controllers/tasksController';

export const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}> {props.label} </FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  )
})

export const Form = ({ taskToEdit, firstFieldRef, onCancel }) => {
  const { updateTask, deleteTask } = usePomodoro()
  const [newTask, setNewTask] = useState({...taskToEdit});
  const updateNewTask = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const updateEstimatedPomos = (newValue) => {
    setNewTask((prev) => ({ ...prev, estimatedPomos: newValue }));
  };
  const updateCompletedPomos = (newValue) => {
    setNewTask((prev) => ({ ...prev, completedPomos: newValue }));
  };
  const saveAndClose = () => {
    updateTask(newTask),
    onCancel();
  }
  return (
    <Stack gap={4} >
      <FormControl>
        <FormLabel fontSize="sm">What you want to do:</FormLabel>
        <Input
          name="title"
          value={newTask.title}
          onChange={updateNewTask}
          variant="flushed"
        />
      </FormControl>

      <Flex gap={4}>
        <FormControl>
          <FormLabel fontSize="sm">Completed Pomodoros:</FormLabel>
          <NumberInput
            name="completedPomos"
            onChange={updateCompletedPomos}
            defaultValue={taskToEdit.completedPomos}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">Estimated Pomodoros:</FormLabel>
          <NumberInput
            name="estimatedPomos"
            onChange={updateEstimatedPomos}
            defaultValue={taskToEdit.estimatedPomos}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        
      </Flex>
      <Flex gap={2} justify="end">
        <Button size="sm" marginRight="auto" onClick={()=>deleteTask(newTask.id)} colorScheme="red">
          Delete
        </Button>
        <Button size="sm" onClick={onCancel} colorScheme="gray">
          Cancel
        </Button>
        <Button size="sm" onClick={saveAndClose} colorScheme="green">
          Save
        </Button>
      </Flex>
    </Stack>

  )
}

export const EditPomoTaskPopover = ({taskToEdit}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
      >
        <PopoverTrigger>
          <IconButton onClick={(e)=>{
            onOpen();
            e.stopPropagation();
          }} size='sm' icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5} bg={useColorModeValue("light.200","dark.100")} >
          <PopoverHeader textAlign="center" fontSize="lg">Edit Task</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form taskToEdit={taskToEdit} firstFieldRef={firstFieldRef} onCancel={onClose} />
        </PopoverContent>
      </Popover>
    </>
  )
}

// render(<PopoverForm />)