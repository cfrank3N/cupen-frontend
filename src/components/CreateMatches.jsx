import { useState, useEffect, useCallback } from "react";
import { Container, Alert, Form, Row, Col } from "react-bootstrap";
import { nonAuthorizedFetch } from "../utility.js";
import AddMatchForm from "./AddMatchForm";

export default function CreateMatches() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredTeams, setFilteredTeams] = useState([]);

  const [matchTypes, setMatchTypes] = useState([]);
  const [matchGroups, setMatchGroups] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateFilteredTeams = (allTournaments, year) => {
    const tournament = allTournaments.find((t) => t.year === parseInt(year));
    setFilteredTeams(tournament ? tournament.teams : []);
  };

  const fetchData = useCallback(async () => {
    try {
      const [tourneyData, typesData, groupsData] = await Promise.all([
        nonAuthorizedFetch("http://localhost:8080/api/tournaments"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/types"),
        nonAuthorizedFetch("http://localhost:8080/api/matches/groups"),
      ]);

      const allTournaments = tourneyData.object || [];
      setTournaments(allTournaments);
      setMatchTypes(typesData.object || []);
      setMatchGroups(groupsData.object || []);

      updateFilteredTeams(allTournaments, selectedYear);
    } catch (err) {
      setError("Kunde inte ladda data.", err.message);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    updateFilteredTeams(tournaments, year);
  };

  const handleStatusUpdate = (msg, err = null) => {
    setSuccess(msg);
    setError(err);
    if (msg) fetchData();
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-warning fw-bold fst-italic m-0">SKAPA MATCHER</h2>

        <Form.Group as={Row} className="align-items-center">
          <Form.Label column xs="auto" className="text-white fw-bold">
            ÅR:
          </Form.Label>
          <Col xs="auto">
            <Form.Select
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-dark text-white border-warning"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.year}>
                  {t.year}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </div>

      {(success || error) && (
        <Alert
          variant={success ? "success" : "danger"}
          dismissible
          onClose={() => {
            setSuccess(null);
            setError(null);
          }}
        >
          {success || error}
        </Alert>
      )}

      <AddMatchForm
        teams={filteredTeams}
        matchTypes={matchTypes}
        matchGroups={matchGroups}
        onMatchCreated={handleStatusUpdate}
      />
    </Container>
  );
}
