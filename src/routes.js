import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import StatisticsPage from "./components/StatisticsPage";
import AdminLogin from "./components/AdminLogin";
import GoalsScoredByAllPlayers from "./components/GoalsScoredByAllPlayers";
import PlayerView from "./components/PlayerView";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/statistics",
    Component: StatisticsPage,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/statistics/playergoals",
    Component: GoalsScoredByAllPlayers,
  },
  {
    path: "/player/:id",
    Component: PlayerView,
  },
]);

export default router;
