import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Collapse,
  Alert,
  Spinner,
} from "react-bootstrap";
import { nonAuthorizedFetch } from "../utility.js";
import AddMatchEvents from "./AddMatchEvents.jsx";

export default function MatchManagement() {
  const [matches, setMatches] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [matchesData, eventTypesData] = await Promise.all([
        nonAuthorizedFetch("http://localhost:8080/api/matches"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/events/types"),
      ]);

      const allMatches = matchesData.object || [];
      setMatches(allMatches);
      setEventTypes(eventTypesData.object || []);

      if (allMatches.length > 0) {
        const years = allMatches.map((m) =>
          new Date(m.playedAt).getFullYear().toString(),
        );
        if (!years.includes(new Date().getFullYear().toString())) {
          setSelectedYear(Math.max(...years).toString());
        }
      }
    } catch (err) {
      setError("Kunde inte ladda matcher.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const availableYears = [
    ...new Set(
      matches.map((m) => new Date(m.playedAt).getFullYear().toString()),
    ),
  ].sort((a, b) => b - a);

  const filteredMatches = matches.filter(
    (m) => new Date(m.playedAt).getFullYear().toString() === selectedYear,
  );

  if (loading)
    return (
      <Container className="text-center my-5">
        <Spinner variant="warning" />
      </Container>
    );

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-warning fw-bold fst-italic mb-0">MATCHARKIV</h2>
          <p className="text-secondary small">
            Välj en match för att lägga till mål eller händelser
          </p>
        </div>

        <Form.Group className="d-flex align-items-center gap-2">
          <Form.Label className="text-white mb-0 small text-uppercase">
            År:
          </Form.Label>
          <Form.Select
            style={{ width: "120px" }}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-dark text-white border-warning"
          >
            {availableYears.length > 0 ? (
              availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            ) : (
              <option value="">Inga år</option>
            )}
          </Form.Select>
        </Form.Group>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <Col xs={12} key={match.id}>
              <Card className="bg-dark border-0 shadow-sm text-white">
                <Card.Body className="p-3">
                  <Row className="align-items-center text-center">
                    <Col
                      md={2}
                      className="small text-secondary text-start font-monospace"
                    >
                      {new Date(match.playedAt).toLocaleDateString("sv-SE")}
                    </Col>

                    <Col md={3} className="fw-bold">
                      {match.teamA.players.map((p) => p.name).join(" & ")}
                    </Col>

                    <Col md={2}>
                      <div className="fs-3 fw-bold text-warning">
                        {match.score}
                      </div>
                      <span
                        className="badge bg-secondary-subtle text-dark text-uppercase px-2"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {match.matchType}
                      </span>
                    </Col>

                    <Col md={3} className="fw-bold">
                      {match.teamB.players.map((p) => p.name).join(" & ")}
                    </Col>

                    <Col md={2} className="text-end">
                      <Button
                        variant={
                          expandedMatchId === match.id
                            ? "warning"
                            : "outline-warning"
                        }
                        size="sm"
                        className="fw-bold"
                        onClick={() =>
                          setExpandedMatchId(
                            expandedMatchId === match.id ? null : match.id,
                          )
                        }
                      >
                        {expandedMatchId === match.id ? "STÄNG" : "HÄNDELSE"}
                      </Button>
                    </Col>
                  </Row>

                  <Collapse in={expandedMatchId === match.id}>
                    <div className="mt-4 pt-4 border-top border-secondary">
                      <AddMatchEvents
                        matches={[match]}
                        eventTypes={eventTypes}
                        onEventCreated={(msg) => {
                          if (msg) {
                            setExpandedMatchId(null);
                            fetchData();
                          }
                        }}
                      />
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5 text-secondary">
            Inga matcher hittades för {selectedYear}.
          </Col>
        )}
      </Row>
    </Container>
  );
}
