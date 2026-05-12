import { useState } from "react";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { authorizedFetch } from "../utility.js";
import { API_URL } from "../config.js";

export default function AddMatchEvents({
  matches,
  eventTypes,
  onEventCreated,
}) {
  const emptyEvent = { matchId: "", teamId: "", playerId: "", eventType: "" };
  const [newEvents, setNewEvents] = useState([{ ...emptyEvent }]);
  const [loading, setLoading] = useState(false);

  const handleEventChange = (index, field, value) => {
    setNewEvents((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
    );
  };

  const getPlayersForTeam = (teamId, matchId) => {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return [];
    if (match.teamA?.id === teamId) return match.teamA.players;
    if (match.teamB?.id === teamId) return match.teamB.players;
    return [];
  };

  const getMatchLabel = (match) => {
    const labelA = match.teamA?.players?.map((p) => p.name).join(" & ") ?? "?";
    const labelB = match.teamB?.players?.map((p) => p.name).join(" & ") ?? "?";
    return `${labelA} vs ${labelB}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authorizedFetch(`${API_URL}/api/matches/events`, {
        method: "POST",
        body: JSON.stringify(newEvents),
      });
      setNewEvents([{ ...emptyEvent }]);
      if (onEventCreated) onEventCreated("Händelser sparade!");
    } catch (err) {
      if (onEventCreated) onEventCreated(null, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {newEvents.map((event, index) => (
        <Card key={index} className="mb-3 bg-body-tertiary border-0">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold text-warning">
                Händelse {index + 1}
              </span>
              {newEvents.length > 1 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setNewEvents((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  Ta bort
                </Button>
              )}
            </div>
            <Row className="g-3">
              <Col md={6}>
                <Form.Select
                  value={event.matchId}
                  onChange={(e) =>
                    handleEventChange(index, "matchId", e.target.value)
                  }
                  required
                >
                  <option value="">Välj match...</option>
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      {getMatchLabel(m)}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Select
                  value={event.teamId}
                  onChange={(e) =>
                    handleEventChange(index, "teamId", e.target.value)
                  }
                  required
                >
                  <option value="">Välj lag...</option>
                  {matches.find((m) => m.id === event.matchId) &&
                    [
                      matches.find((m) => m.id === event.matchId).teamA,
                      matches.find((m) => m.id === event.matchId).teamB,
                    ].map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.players.map((p) => p.name).join(" & ")}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Select
                  value={event.playerId}
                  onChange={(e) =>
                    handleEventChange(index, "playerId", e.target.value)
                  }
                  required
                >
                  <option value="">Välj spelare...</option>
                  {getPlayersForTeam(event.teamId, event.matchId).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Select
                  value={event.eventType}
                  onChange={(e) =>
                    handleEventChange(index, "eventType", e.target.value)
                  }
                  required
                >
                  <option value="">Välj händelsetyp...</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
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
          onClick={() => setNewEvents((prev) => [...prev, { ...emptyEvent }])}
        >
          + Lägg till händelse
        </Button>
        <Button variant="warning" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Spara händelser"
          )}
        </Button>
      </div>
    </Form>
  );
}
