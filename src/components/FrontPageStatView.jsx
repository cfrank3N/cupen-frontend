import { useEffect, useState } from "react";
import MyCard from "./MyCard";
import HomePageBanner from "./HomePageBanner";
import { Container, Row, Col } from "react-bootstrap";
import RecentMatches from "./RecentMatches";
import { API_URL } from "../config";

function FrontPageStatView() {
  const [stats, setStats] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [playerRes, teamsRes, matchesRes] = await Promise.all([
        fetch(`${API_URL}/api/statistics/players`),
        fetch(`${API_URL}/api/statistics/teams`),
        fetch(`${API_URL}/api/statistics/matches`),
      ]);

      const players = await playerRes.json();
      const teams = await teamsRes.json();
      const matchesData = await matchesRes.json();

      const matches = matchesData.object;

      setStats([
        { label: "Spelare", num: players.object.length },
        { label: "Lag", num: teams.object.length },
        { label: "Matcher", num: matches.length },
      ]);

      const formattedMatches = matches.slice(0, 5).map((m) => ({
        teamA: m.teamA.players.map((p) => p.name).join(" & "),
        teamB: m.teamB.players.map((p) => p.name).join(" & "),
        score: m.score,
        group: m.matchType,
        date: m.playedAt.slice(0, 10),
      }));
      setRecentMatches(formattedMatches);
    };

    fetchStats();
  }, []);

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-4">
        <Col className="md-6 sm-12">
          <HomePageBanner />
        </Col>
        <Col className="md-6 sm-12">
          <MyCard stats={stats} />
        </Col>
      </Row>
      <RecentMatches matches={recentMatches} />
    </Container>
  );
}

export default FrontPageStatView;
