import { Flex, DarkMode } from "@chakra-ui/react";
import { PomoTimer } from "components";
import { chakra } from "@chakra-ui/system";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function Pomodoro() {
  const location = useLocation();
  useEffect(()=>location.state={},[])
  return (
    <DarkMode>
      <Flex
        color="white"
        bgGradient="linear-gradient(to-br, primary.base, primary.light)"
        flexWrap="wrap"
        p={4}
        gap={4}
        borderRadius={8}
        min-height="83vh"
      >
        <PomoTimer />
      </Flex>
    </DarkMode>
  );
}
