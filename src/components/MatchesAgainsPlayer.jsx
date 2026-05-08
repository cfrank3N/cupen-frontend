import { Container, Form, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { nonAuthorizedFetch } from "../utility";
import { MatchResultVersionTwo } from "./MatchResult";

function MatchesAgainstPlayer({ currentPlayerId }) {
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedOpponentId, setSelectedOpponentId] = useState("");
  const [h2hMatches, setH2hMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPlayers, setFetchingPlayers] = useState(true);

  const handleOpponentChange = (e) => {
    const nextId = e.target.value;
    setSelectedOpponentId(nextId);

    if (!nextId) {
      setH2hMatches([]);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await nonAuthorizedFetch(
          "http://localhost:8080/api/players",
        );
        // Filter out the current player so they can't select themselves
        const others = data.object.filter((p) => p.id !== currentPlayerId);
        setAllPlayers(others);
      } catch (err) {
        console.error("Failed to load players", err);
      } finally {
        setFetchingPlayers(false);
      }
    };
    fetchPlayers();
  }, [currentPlayerId]);

  useEffect(() => {
    if (!selectedOpponentId) {
      return;
    }

    const fetchH2H = async () => {
      setLoading(true);
      try {
        const data = await nonAuthorizedFetch(
          `http://localhost:8080/api/statistics/player/${currentPlayerId}/versus/${selectedOpponentId}`,
        );
        setH2hMatches(data.object || []);
      } catch (err) {
        console.error("H2H Fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchH2H();
  }, [selectedOpponentId, currentPlayerId]);

  return (
    <Container className="my-4 border border-warning rounded py-3">
      <h4 className="fw-bold text-center text-warning fst-italic">
        MATCHER MOT MOTSTÅNDARE
      </h4>
      <Form.Group className="mb-4 mx-auto" style={{ maxWidth: "400px" }}>
        <Form.Label className="text-light small fw-bold">
          VÄLJ MOTSTÅNDARE
        </Form.Label>
        <Form.Select
          className="bg-secondary text-white border-warning"
          value={selectedOpponentId}
          onChange={(e) => setSelectedOpponentId(e.target.value)}
          disabled={fetchingPlayers}
        >
          <option value="">-- Välj en spelare --</option>
          {allPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <hr className="border-secondary mb-4" />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : selectedOpponentId ? (
        h2hMatches.length > 0 ? (
          <MatchResultVersionTwo matches={h2hMatches} />
        ) : (
          <Alert
            variant="dark"
            className="text-center text-warning border-warning"
          >
            Inga matcher hittades mot denna spelare.
          </Alert>
        )
      ) : (
        <p className="text-center text-secondary fst-italic">
          Välj en spelare i listan för att se resultathistorik.
        </p>
      )}
    </Container>
  );
}

export default MatchesAgainstPlayer;
