import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import LastFiveMatches from "./LastFiveMatches.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nonAuthorizedFetch } from "../utility.js";
import { Spinner, Alert, Button, Container } from "react-bootstrap";
import { FormerTeams } from "./FormerTeams.jsx";
import { SimplifiedPlayerStats } from "./SimplifiedPlayerStats.jsx";
import StatsAgainstAllPlayers from "./StatsAgainstAllPlayers.jsx";
import BiggestWin from "./BiggestWin.jsx";
import BiggestLoss from "./BiggestLoss.jsx";
import MatchesAgainstPlayer from "./MatchesAgainsPlayer.jsx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";

export default function PlayerView() {
  const { id } = useParams();
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          `${API_URL}/api/statistics/player/${id}`,
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
      <LastFiveMatches
        matches={playerStats.lastFiveMatches}
        playerName={playerStats.name}
        playerImage={playerStats.imageUrl}
        rating={playerStats.rating}
      />
      <Container className="text-center mb-5">
        <Button
          variant="warning"
          className="fw-bold px-4 shadow-sm"
          onClick={() => navigate(`/player/${id}/matches`)}
        >
          SE ALLA MATCHER
        </Button>
      </Container>
      <FormerTeams teams={playerStats.formerTeams} />
      <SimplifiedPlayerStats stats={playerStats.stats} />
      <StatsAgainstAllPlayers versusStats={playerStats.statsAgainstAll} />
      <BiggestWin match={playerStats.biggestWin} />
      <BiggestLoss match={playerStats.biggestLoss} />
      <MatchesAgainstPlayer currentPlayerId={id} />
      <MyFooter />
    </>
  );
}
