import { Task } from "components";
import { Droppable } from "react-beautiful-dnd";
import {
  Button,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";

export function Column({ column, tasks, deleteColumn }) {
  const { _id, title } = column;
  return (
    <Stack minWidth="xs" w="xs" bg={useColorModeValue("light.200", "dark.100")}>
      <Heading
        as="h2"
        color="light.100"
        p={2}
        borderTopRadius={8}
        textAlign="left"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        size="md"
        bgGradient="linear-gradient(to-br, primary.base, primary.light)"
      >
        {title}
        <button onClick={() => deleteColumn(_id)}>
          <DeleteIcon fontSize="md" />
        </button>
      </Heading>
      <Droppable droppableId={_id}>
        {(provided) => (
          <Stack
            gap={1}
            p={2}
            borderBottomRadius={8}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, idx) => (
              <Task key={task._id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
}
