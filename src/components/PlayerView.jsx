import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import LastFiveMatches from "./LastFiveMatches.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nonAuthorizedFetch } from "../utility.js";
import { Spinner, Alert } from "react-bootstrap";

export default function PlayerView() {
  const { id } = useParams();
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          `http://localhost:8080/api/statistics/player/${id}`,
        );
        setPlayerStats(data.object);
      } catch (err) {
        console.error("Failed to fetch player stats", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayerStats();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" className="m-5" />;
  }
  if (!playerStats) {
    return <Alert variant="danger">Failed to load player</Alert>;
  }

  return (
    <>
      <MyNavBar />
      <LastFiveMatches matches={playerStats.lastFiveMatches} />
      <MyFooter />
    </>
  );
}
