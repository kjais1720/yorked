import { Box, Flex, DarkMode, Heading } from "@chakra-ui/react";
import { PomoTimer, PomoTasks } from "components";
import { chakra } from "@chakra-ui/system";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function Pomodoro() {

  return (
      <Box>
        <Heading textAlign="center" marginBottom={4}>Pomodoro</Heading>
        <Flex
          color="white"
          p={{base:0, md:4}}
          gap={4}
          min-height="83vh"
          w="full"
          flexWrap="wrap"
          justify="center"
        >
          <PomoTimer />
          <PomoTasks />
        </Flex>
      </Box>
  );
}
