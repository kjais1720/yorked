import { Flex, DarkMode } from "@chakra-ui/react";
import { PomoTimer, PomoTasks } from "components";
import { chakra } from "@chakra-ui/system";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function Pomodoro() {

  return (
      <Flex
        color="white"
        p={4}
        gap={4}
        min-height="83vh"
      >
        <PomoTimer />
        <PomoTasks />
      </Flex>
  );
}
