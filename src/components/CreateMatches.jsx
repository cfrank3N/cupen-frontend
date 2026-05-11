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
  Tabs,
  Tab,
} from "react-bootstrap";
import { authorizedFetch, nonAuthorizedFetch } from "../utility.js";

export default function CreateMatches() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matchTypes, setMatchTypes] = useState([]);
  const [matchGroups, setMatchGroups] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Create matches state
  const emptyMatch = {
    teamAId: "",
    teamBId: "",
    playedAt: "",
    matchType: "",
    matchGroup: "",
  };
  const [newMatches, setNewMatches] = useState([{ ...emptyMatch }]);

  // Create events state
  const emptyEvent = { matchId: "", teamId: "", playerId: "", eventType: "" };
  const [newEvents, setNewEvents] = useState([{ ...emptyEvent }]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        teamsData,
        matchesData,
        playersData,
        typesData,
        groupsData,
        eventTypesData,
      ] = await Promise.all([
        nonAuthorizedFetch("http://localhost:8080/api/teams"),
        nonAuthorizedFetch("http://localhost:8080/api/matches"),
        nonAuthorizedFetch("http://localhost:8080/api/players"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/types"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/groups"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/events/types"),
      ]);
      setTeams(teamsData.object);
      setMatches(matchesData.object);
      setPlayers(playersData.object);
      setMatchTypes(typesData.object);
      setMatchGroups(groupsData.object);
      setEventTypes(eventTypesData.object);
    };
    fetchData();
  }, []);

  const handleMatchChange = (index, field, value) => {
    setNewMatches((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    );
  };

  const handleEventChange = (index, field, value) => {
    setNewEvents((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
    );
  };

  // Filter players by selected team for event creation
  const getPlayersForTeam = (teamId, matchId) => {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return [];
    if (match.teamA?.id === teamId) return match.teamA.players;
    if (match.teamB?.id === teamId) return match.teamB.players;
    return [];
  };
  const handleCreateMatches = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
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
      setSuccess("Matches created!");
      setNewMatches([{ ...emptyMatch }]);
      // refresh matches list
      const matchesData = await nonAuthorizedFetch(
        "http://localhost:8080/api/matches",
      );
      setMatches(matchesData.object);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authorizedFetch("http://localhost:8080/api/matches/events", {
        method: "POST",
        body: JSON.stringify(newEvents),
      });
      setSuccess("Events created!");
      setNewEvents([{ ...emptyEvent }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMatchLabel = (match) => {
    const labelA = match.teamA?.players?.map((p) => p.name).join(" & ") ?? "?";
    const labelB = match.teamB?.players?.map((p) => p.name).join(" & ") ?? "?";
    return `${labelA} vs ${labelB}`;
  };

  return (
    <Container className="my-5">
      <h2 className="text-warning fw-bold fst-italic mb-4">SKAPA MATCHER</h2>

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Tabs defaultActiveKey="matches" className="mb-4">
        {/* CREATE MATCHES TAB */}
        <Tab eventKey="matches" title="Skapa matcher">
          <Form onSubmit={handleCreateMatches}>
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
                          setNewMatches((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
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
                onClick={() =>
                  setNewMatches((prev) => [...prev, { ...emptyMatch }])
                }
              >
                + Lägg till match
              </Button>
              <Button variant="warning" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Skapa matcher"
                )}
              </Button>
            </div>
          </Form>
        </Tab>

        {/* CREATE EVENTS TAB */}
        <Tab eventKey="events" title="Lägg till händelser">
          <Form onSubmit={handleCreateEvents}>
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
                          setNewEvents((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
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
                        {getPlayersForTeam(event.teamId, event.matchId).map(
                          (p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ),
                        )}
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
                onClick={() =>
                  setNewEvents((prev) => [...prev, { ...emptyEvent }])
                }
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
        </Tab>
      </Tabs>
    </Container>
  );
}
