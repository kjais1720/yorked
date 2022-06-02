import { NavLink } from "react-router-dom";
import {
  Heading,
  Flex,
  Box,
  IconButton,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSmallerThan720] = useMediaQuery("(max-width:720px)");

  const getActiveLinkColor = ({ isActive }) =>
    isActive ? { color: "rgb(0, 200, 255)" } : { color: "hsl(0,0%,54%)" };

  return (
    <Box shadow="md">
      <Flex as="header" py={4} align="center" px={isSmallerThan720 ? 4 : 8}>
        <Heading
          as="h1"
          bgGradient="linear(to-br, primary.base, primary.light)"
          bgClip="text"
          userSelect="none"
        >
          <NavLink to="/">Yorked</NavLink>
        </Heading>
        <Flex as="ul" gap={4} ml="auto" align="center">
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          />
          <Text fontWeight="semibold">
            <NavLink style={getActiveLinkColor} to="/auth">
              Login
            </NavLink>
          </Text>
          <Text fontWeight="semibold">
            <NavLink style={getActiveLinkColor} to="/boards">
              Boards
            </NavLink>
          </Text>
          <Text fontWeight="semibold">
            <NavLink style={getActiveLinkColor} to="/pomodoro">
              Pomodoro
            </NavLink>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
