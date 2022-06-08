import { useBoards } from "contexts";
import {
  Box,
  Flex,
  Input,
  Button,
  IconButton,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { boardsDispatchConstants, useDocumentTitle } from "utilities";
import { useState } from "react";
const { CREATE_NEW_BOARD, DELETE_BOARD } = boardsDispatchConstants;

export function Boards() {
  const { boards, boardsApiDispatch } = useBoards();
  const [newBoardTitle, setNewBoardTitle] = useState("");
  useDocumentTitle("Task Boards");
  const createNewBoard = (e) => {
    e.preventDefault();
    boardsApiDispatch({
      type: CREATE_NEW_BOARD,
      payload: { title: newBoardTitle },
    });
    setNewBoardTitle("");
  };

  const deleteBoard = (id) => {
    boardsApiDispatch({
      type: DELETE_BOARD,
      payload: id,
    });
  };

  const changeHandler = (e) => setNewBoardTitle(e.target.value);

  return (
    <Box gap={4} align="center" w="full">
      <Heading as="h2" size="md">
        All Boards
      </Heading>
      <form onSubmit={createNewBoard}>
        <Flex marginTop={4} maxWidth="sm" textAlign="center" gap={2} justify="center">
          <Input
            onChange={changeHandler}
            value={newBoardTitle}
            placeholder="Create new board"
          />
          <Button type="submit">
            <FaPlus />
          </Button>
        </Flex>
      </form>
      <Flex color="white" justify="center" marginTop={4} gap={2} wrap="wrap">
        {boards.map(({ title, _id }) => (
            <Flex
              p={4}
              height={160}
              bgGradient="linear-gradient(to-br, primary.base, primary.light)"
              borderRadius={4}
              shadow="md"
              key={_id}
              flexBasis={64}
              justify="center"
              align="center"
              position="relative"
            >
          <Link to={`/boards/${_id}`}>
              <Text fontSize="2xl">{title}</Text>
          </Link>
              <IconButton position="absolute" top={4} right={4} bg="transparent" ml="auto" onClick={(e) => deleteBoard(_id)}>
                <FaTrash />
              </IconButton>
            </Flex>
        ))}
      </Flex>
    </Box>
  );
}
