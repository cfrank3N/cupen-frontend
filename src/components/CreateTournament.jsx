import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { authorizedFetch } from "../utility.js";
import { API_URL } from "../config.js";

export default function CreateTournament() {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authorizedFetch(`${API_URL}/api/tournaments`, {
        method: "POST",
        body: JSON.stringify({ year: parseInt(year) }),
      });
      setSuccess(`Tournament ${year} created!`);
      setYear("");
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: "400px" }}>
        <h2 className="text-warning fw-bold fst-italic mb-4">
          SKAPA TURNERING
        </h2>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Turneringens årtal</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 2026"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="warning" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Skapa turnering"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
