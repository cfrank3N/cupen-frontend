import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import StatisticsPage from "./components/StatisticsPage";
import AdminLogin from "./components/AdminLogin";

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
]);

export default router;
