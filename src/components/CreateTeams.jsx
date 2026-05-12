import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { authorizedFetch } from "../utility.js";
import { API_URL } from "../config.js";

const emptyTeam = { playerIds: [] };

export default function CreateTeams() {
  const [teams, setTeams] = useState([{ ...emptyTeam }]);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [playersData, tournamentsData] = await Promise.all([
        authorizedFetch(`${API_URL}/api/players`),
        authorizedFetch(`${API_URL}/api/tournaments`),
      ]);
      setPlayers(playersData.object);
      setTournaments(tournamentsData.object);
    };
    fetchData();
  }, []);

  const handlePlayerSelect = (teamIndex, playerId) => {
    setTeams((prev) =>
      prev.map((team, i) => {
        if (i !== teamIndex) return team;
        const already = team.playerIds.includes(playerId);
        return {
          ...team,
          playerIds: already
            ? team.playerIds.filter((id) => id !== playerId)
            : [...team.playerIds, playerId],
        };
      }),
    );
  };

  const addTeam = () => setTeams((prev) => [...prev, { ...emptyTeam }]);

  const removeTeam = (index) => {
    if (teams.length === 1) return;
    setTeams((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = teams.map((t) => ({ playerIds: t.playerIds }));
      await authorizedFetch(`${API_URL}/api/teams/${tournamentId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSuccess(`${teams.length} team(s) created!`);
      setTeams([{ ...emptyTeam }]);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setError("You are not authorized to do this.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-warning fw-bold fst-italic mb-4">SKAPA LAG</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label className="text-warning fw-semibold">
            Turnering
          </Form.Label>
          <Form.Select
            value={tournamentId}
            onChange={(e) => setTournamentId(e.target.value)}
            required
          >
            <option value="">Välj turnering...</option>
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.year}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {teams.map((team, teamIndex) => (
          <Card key={teamIndex} className="mb-3 bg-body-tertiary border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold text-warning">
                  Lag {teamIndex + 1}
                </span>
                {teams.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeTeam(teamIndex)}
                  >
                    Ta bort
                  </Button>
                )}
              </div>
              <Row className="g-2">
                {players.map((player) => (
                  <Col key={player.id} xs={6} md={4} lg={3}>
                    <Form.Check
                      type="checkbox"
                      label={player.name}
                      checked={team.playerIds.includes(player.id)}
                      onChange={() => handlePlayerSelect(teamIndex, player.id)}
                    />
                  </Col>
                ))}
              </Row>
              <small className="text-secondary mt-2 d-block">
                {team.playerIds.length} spelare valda
              </small>
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex gap-2 mt-2">
          <Button variant="outline-warning" onClick={addTeam}>
            + Lägg till lag
          </Button>
          <Button variant="warning" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Skapa lag"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
