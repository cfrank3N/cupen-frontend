import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import { TotalTableStats } from "./TotalTableStats";
import { nonAuthorizedFetch } from "../utility.js";
import { useEffect, useState } from "react";

export default function TotalTable() {
  const [marathonData, setMarathonData] = useState(null);

  useEffect(() => {
    const getMarathonStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          "http://localhost:8080/api/statistics/marathontable",
        );
        setMarathonData(data);
      } catch (err) {
        console.error("Failed to fetch marathon stats:", err);
      }
    };

    getMarathonStats();
  }, []);
  return (
    <>
      <MyNavBar />
      <TotalTableStats stats={marathonData} />
      <MyFooter />
    </>
  );
}
