import { useEffect, useState, useMemo } from "react";
import { useTimer } from "utilities";
import { usePomodoro } from "contexts";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Flex,
  Button,
  DarkMode,
  Text,
} from "@chakra-ui/react";
import { FaPlay, FaStop, FaPause, FaRedo } from "react-icons/fa";

const timers = [
  {
    name: "Pomodoro",
    timeLimit: 1500,
  },
  {
    name: "Short Break",
    timeLimit: 300,
  },
  {
    name: "Long Break",
    timeLimit: 900,
  },
];

const getFormattedTimeString = (timeInSeconds) => {
  let minutes = String(Math.floor(timeInSeconds / 60));
  let seconds = String(timeInSeconds % 60);
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};

export function PomoTimer() {
  const [timerToShow, setTimerToShow] = useState({ ...timers[0] });
  const [timeLimit, setTimeLimit] = useState(null);
  const {
    timeLeft,
    startTimer,
    restartTimer,
    pauseTimer,
    stopTimer,
    timerStatus,
  } = useTimer(timeLimit);
  useEffect(() => {
    if (timerStatus === "stopped") setTimeLimit(null);
  }, [timerStatus]);
  const { pomoTasks } = usePomodoro();
  const taskFromBoard = pomoTasks.find(({ isActive }) => isActive);

  const changeTimer = (e) => {
    const { name, value } = e.target;
    if (name !== timerToShow.timerType) {
      if (timerStatus !== "stopped") {
        const userConfirmation = confirm(
          "The timer is still running, are you sure you want to switch?"
        );
        if (userConfirmation) {
          stopTimer();
          setTimerToShow({
            name: name,
            timeLimit: value,
          });
        }
      } else {
        setTimerToShow({
          name: name,
          timeLimit: value,
        });
      }
    }
  };

  const progressPercent =
    ((timerStatus === "stopped" ? timerToShow.timeLimit : timeLeft) /
      timeLimit) *
    100;
  const timeInMinutes =
    timerStatus === "stopped"
      ? getFormattedTimeString(timerToShow.timeLimit)
      : getFormattedTimeString(timeLeft);
  document.title = timeInMinutes;
  return (
    <DarkMode>
      <Stack
        flexGrow={1}
        bgGradient="linear-gradient(to-br, primary.base, primary.light)"
        padding={4}
        borderRadius={8}
       flex={1} flexBasis="350px" gap={4} align="center">
        <Flex gap={4} flexWrap="wrap" justify="center">
          {timers.map(({ name, timeLimit }, idx) => (
            <Button
              key={idx}
              bg={
                timerToShow.name === name ? "primary.light" : "whiteAlpha.200"
              }
              onClick={changeTimer}
              name={name}
              value={timeLimit}
              color="white"
              borderRadius={8}
            >
              {name}
            </Button>
          ))}
        </Flex>
        <Heading as="h3" textAlign="center" size="lg" height="45px">
          {taskFromBoard && taskFromBoard.title}
        </Heading>
        <CircularProgress
          capIsRound
          color="green.400"
          value={progressPercent}
          size="250px"
          thickness="5px"
        >
          <CircularProgressLabel fontFamily="pomo" size="4xl">
            {timeInMinutes}
          </CircularProgressLabel>
        </CircularProgress>
        {timerStatus === "stopped" ? (
          <Button
            onClick={() => setTimeLimit(timerToShow.timeLimit)}
            color="white"
            borderRadius={8}
            size="lg"
            fontSize="xx-large"
          >
            <FaPlay title="start" />
          </Button>
        ) : (
          <Flex gap={4}>
            <Button
              onClick={timerStatus === "paused" ? startTimer : pauseTimer}
              color="white"
              borderRadius={8}
              size="lg"
              fontSize="xx-large"
            >
              {timerStatus === "paused" ? (
                <FaPlay title="resume" />
              ) : (
                <FaPause title="pause" />
              )}
            </Button>
            <Button
              onClick={restartTimer}
              color="white"
              borderRadius={8}
              size="lg"
              fontSize="xx-large"
            >
              <FaRedo title="restart" />
            </Button>
            <Button
              onClick={stopTimer}
              color="white"
              borderRadius={8}
              size="lg"
              fontSize="xx-large"
            >
              <FaStop title="stop" />
            </Button>
          </Flex>
        )}
      </Stack>
    </DarkMode>
  );
}
