import { useState } from "react";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { authorizedFetch, nonAuthorizedFetch } from "../utility.js";

export default function AddMatchForm({
  teams,
  matchTypes,
  matchGroups,
  onMatchCreated,
}) {
  const emptyMatch = {
    teamAId: "",
    teamBId: "",
    playedAt: "",
    matchType: "",
    matchGroup: "",
  };
  const [newMatches, setNewMatches] = useState([{ ...emptyMatch }]);
  const [loading, setLoading] = useState(false);

  const handleMatchChange = (index, field, value) => {
    setNewMatches((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = newMatches.map((m) => ({
        ...m,
        playedAt: new Date(m.playedAt).toISOString(),
        matchGroup: m.matchGroup === "" ? null : m.matchGroup,
      }));

      await authorizedFetch("http://localhost:8080/api/matches", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setNewMatches([{ ...emptyMatch }]);
      if (onMatchCreated) onMatchCreated("Matcher skapade!");
    } catch (err) {
      if (onMatchCreated) onMatchCreated(null, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {newMatches.map((match, index) => (
        <Card key={index} className="mb-3 bg-body-tertiary border-0">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold text-warning">
                Match {index + 1}
              </span>
              {newMatches.length > 1 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setNewMatches(newMatches.filter((_, i) => i !== index))
                  }
                >
                  Ta bort
                </Button>
              )}
            </div>
            <Row className="g-3">
              <Col md={6}>
                <Form.Select
                  value={match.teamAId}
                  onChange={(e) =>
                    handleMatchChange(index, "teamAId", e.target.value)
                  }
                  required
                >
                  <option value="">Välj lag A...</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.players.map((p) => p.name).join(" & ")}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Select
                  value={match.teamBId}
                  onChange={(e) =>
                    handleMatchChange(index, "teamBId", e.target.value)
                  }
                  required
                >
                  <option value="">Välj lag B...</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.players.map((p) => p.name).join(" & ")}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control
                  type="datetime-local"
                  value={match.playedAt}
                  onChange={(e) =>
                    handleMatchChange(index, "playedAt", e.target.value)
                  }
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={match.matchType}
                  onChange={(e) =>
                    handleMatchChange(index, "matchType", e.target.value)
                  }
                  required
                >
                  <option value="">Välj matchtyp...</option>
                  {matchTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  value={match.matchGroup}
                  onChange={(e) =>
                    handleMatchChange(index, "matchGroup", e.target.value)
                  }
                >
                  <option value="">Välj grupp (valfritt)...</option>
                  {matchGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <div className="d-flex gap-2">
        <Button
          variant="outline-warning"
          onClick={() => setNewMatches([...newMatches, { ...emptyMatch }])}
        >
          + Lägg till match
        </Button>
        <Button variant="warning" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Spara matcher"}
        </Button>
      </div>
    </Form>
  );
}
