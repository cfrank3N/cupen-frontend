import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import StatisticsPage from "./components/StatisticsPage";
import AdminLogin from "./components/AdminLogin";
import GoalsScoredByAllPlayers from "./components/GoalsScoredByAllPlayers";
import PlayerView from "./components/PlayerView";
import PlayerMatchHistory from "./components/PlayerMatchHistory";
import AllPlayersView from "./components/AllPlayersView";
import TotalTable from "./components/TotalTable";
import TeamGoalsTable from "./components/TeamGoalsTable";
import AdminPage from "./components/AdminPage";

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
  {
    path: "/player/:id/matches",
    Component: PlayerMatchHistory,
  },
  {
    path: "/player",
    Component: AllPlayersView,
  },
  {
    path: "/statistics/totaltable",
    Component: TotalTable,
  },
  {
    path: "/statistics/teamgoals",
    Component: TeamGoalsTable,
  },
  {
    path: "/admin/create",
    Component: AdminPage,
  },
]);

export default router;
