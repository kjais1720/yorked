import { useState, useEffect } from "react";
const audio = new Audio('/zapsplat_household_alarm_clock_beeps_002_37448.mp3')

export const useTimer = ( timeLimit ) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerId, setTimerId] = useState(0);
  const [timerStatus, setTimerStatus] = useState("stopped");
  const startTimer = () => {
    setTimerStatus("started");
    const timerId = setInterval(() => {
      setTimeLeft((curr) => curr - 1);
    }, 1000);
    setTimerId(timerId);
  };
  const pauseTimer = () => {
    setTimerStatus("paused")
    clearInterval(timerId);
  };
  const restartTimer = () => {
    setTimerStatus("restarted")
    clearInterval(timerId);
    setTimeLeft(timeLimit);
    startTimer();
  };
  const stopTimer = () => {
    setTimerStatus("stopped");
    clearInterval(timerId);
    audio.pause()
  }

  useEffect(() => {
    if(timeLimit) restartTimer();
    return () => clearInterval(timerId);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft === 0){
      clearInterval(timerId);
      audio.play()
    }
  }, [timeLeft]);

  return { timeLeft, startTimer, pauseTimer, restartTimer, stopTimer, timerStatus }
};
