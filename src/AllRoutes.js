import { Routes, Route } from "react-router-dom";
import {
  Home,
  Pomodoro,
  Boards,
  NotFound,
  Archives,
  Login,
  TaskBoard,
  RequiresAuth,
} from "pages";
import { LoginCard, SignupCard } from "components";
import { Box } from "@chakra-ui/react";
export function AllRoutes() {
  return (
    <Box px={{base:4, md:8}} py={4}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequiresAuth />}>
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<TaskBoard />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Route>
        <Route path="/auth" element={<Login />}>
          <Route path="login" element={<LoginCard />} />
          <Route path="signup" element={<SignupCard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
