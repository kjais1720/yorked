import { NavLink } from "react-router-dom";
import {
  Button,
  Heading,
  Flex,
  Box,
  IconButton,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAuth } from "contexts";
import { FaMoon, FaSun } from "react-icons/fa";
export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userState, logout } = useAuth();
  const {
    user: { firstName },
    isLoggedIn,
  } = userState;

  const getActiveLinkColor = ({ isActive }) =>
    isActive ? { color: "rgb(0, 200, 255)" } : { color: "hsl(0,0%,54%)" };

  return (
    <Box shadow="md">
      <Flex as="header" py={4} align="center" gap={{base:4}} px={{base:8, sm:4}} flexWrap="wrap">
        <Heading
          as="h1"
          bgGradient="linear(to-br, primary.base, primary.light)"
          bgClip="text"
          userSelect="none"
        >
          <NavLink to="/">Yorked.</NavLink>
        </Heading>
        <Flex as="ul" gap={4} ml="auto" align="center">
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          />
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
          <Text fontWeight="semibold">
            {isLoggedIn ? (
              <Button color="gray.500" onClick={logout}>
                Logout
              </Button>
            ) : (
              <NavLink style={getActiveLinkColor} to="/auth/login">
                Login
              </NavLink>
            )}
          </Text>

        </Flex>
      </Flex>
      <Box
        bgGradient="linear-gradient(to-r, primary.base, primary.light)"
        h={1}
      />
    </Box>
  );
}
