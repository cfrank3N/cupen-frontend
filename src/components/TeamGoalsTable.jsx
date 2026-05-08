import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import { nonAuthorizedFetch } from "../utility.js";
import { useEffect, useState } from "react";
import TeamGoalsTableStats from "./TeamGoalsTableStats.jsx";

export default function TeamGoalsTable() {
  const [teamGoalsData, setTeamGoalsData] = useState(null);

  useEffect(() => {
    const getMarathonStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          "http://localhost:8080/api/statistics/teamgoals",
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
