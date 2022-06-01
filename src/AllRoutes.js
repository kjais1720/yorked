import { Routes, Route } from "react-router-dom";
import { Home,Pomodoro, Boards, TaskBoard } from "pages";
import { useMediaQuery, Box } from "@chakra-ui/react";
export function AllRoutes() {
  const [isSmallerThan720] = useMediaQuery("(max-width:720px)");
  return (
    <Box px={isSmallerThan720 ? 4 : 8} py={4}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<TaskBoard />} />
        <Route path="/pomodoro" element={<Pomodoro />} />

      </Routes>
    </Box>
  );
}
