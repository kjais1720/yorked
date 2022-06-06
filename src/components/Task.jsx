import { useBoards } from "contexts";
import { TaskDetailsModal } from "components";
import { Draggable } from "react-beautiful-dnd";
import { FaCheckSquare, FaArrowUp, FaGripVertical } from "react-icons/fa";
import { Box, Flex, Stack, Heading, useColorMode, useDisclosure } from "@chakra-ui/react";

const getPriorityColor = (priority) => {
  if (priority === "low") return "green.500";
  if (priority === "medium") return "orange.500";
  return "red.500";
};

const getPriorityAngle = (priority) => {
  if (priority === "low") return "180deg";
  if (priority === "medium") return "45deg";
  return "0deg";
};

export function Task({ task, index }) {
  const { colorMode } = useColorMode();
  const { selectedPriority } = useBoards();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { subTasks, title, priority, _id } = task;
  const totalTasks = subTasks.length;
  const checkedTasks = subTasks.reduce(
    (acc, curr) => (curr.checked ? acc + 1 : acc),
    0
  );
  const progress = Math.ceil((checkedTasks / totalTasks) * 100) + "%";
  return (
    (selectedPriority === priority || selectedPriority === "all") &&
    <Box>
      <Draggable draggableId={_id} index={index}>
        {(provided) => (
          <Stack
            p={2}
            mb={1}
            gap={2}
            boxShadow="md"
            borderRadius="lg"
            bg={colorMode === "light" ? "light.100" : "dark.200"}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={()=>onOpen()}
          >
            <Heading as="h3" fontSize="sm" textAlign="left">
              {title}
            </Heading>
            <Flex
              gap={4}
              alignItems="center"
              color={colorMode === "light" ? "primary.base" : "primary.light"}
            >
              <Box
                fontSize="md"
                color={getPriorityColor(priority)}
                transform={`rotate(${getPriorityAngle(priority)})`}
                priority={priority}
              >
                <FaArrowUp />
              </Box>
              {totalTasks ? (
                <Flex align="center" flexGrow={1} gap={2}>
                  <Flex
                    p={1}
                    gap={1}
                    align="center"
                    fontSize="xs"
                    borderRadius="lg"
                    border={
                      colorMode === "light"
                        ? "solid 1px gray.300"
                        : "solid 1px gray.500"
                    }
                    border={1}
                  >
                    <FaCheckSquare />
                    <span>
                      {checkedTasks}/{totalTasks}
                    </span>
                  </Flex>
                  <Box
                    flex={1}
                    height={1}
                    borderRadius="sm"
                    bg="gray.500"
                    bgGradient={`linear-gradient(to-r, primary.light ${progress}, ${
                      colorMode === "light" ? "gray.300" : "dark.100"
                    } ${progress} )`}
                  />
                </Flex>
              ) : (
                ""
              )}
              <Box marginLeft="auto" as="span" {...provided.dragHandleProps}>
                <FaGripVertical />
              </Box>
            </Flex>
          </Stack>
        )}
      </Draggable>
        {isOpen && <TaskDetailsModal task={task} isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}
