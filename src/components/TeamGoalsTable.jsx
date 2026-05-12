import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import { nonAuthorizedFetch } from "../utility.js";
import { useEffect, useState } from "react";
import TeamGoalsTableStats from "./TeamGoalsTableStats.jsx";
import { API_URL } from "../config.js";

export default function TeamGoalsTable() {
  const [teamGoalsData, setTeamGoalsData] = useState(null);

  useEffect(() => {
    const getMarathonStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          `${API_URL}/api/statistics/teamgoals`,
        );
        setTeamGoalsData(data);
      } catch (err) {
        console.error("Failed to fetch team goal stats:", err);
      }
    };

    getMarathonStats();
  }, []);
  return (
    <>
      <MyNavBar />
      <TeamGoalsTableStats stats={teamGoalsData} />
      <MyFooter />
    </>
  );
}
