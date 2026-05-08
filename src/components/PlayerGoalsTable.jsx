import { Card, Container, Table, Spinner, Alert } from "react-bootstrap";
import { nonAuthorizedFetch } from "../utility";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayerGoalsTable() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          "http://localhost:8080/api/statistics/goals",
        );
        // Map the .object array from your JSON
        setStats(data.object || []);
      } catch (err) {
        setError(err.message || "Kunde inte hämta skytteligan");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        SKYTTELIGAN
      </h4>
      <Table
        hover
        responsive
        className="marathon-table align-middle bg-white shadow-sm"
      >
        <thead className="border-bottom border-warning">
          <tr className="text-uppercase small fw-bold">
            <th className="text-center" style={{ width: "50px" }}>
              #
            </th>
            <th>Spelare</th>
            <th className="text-center text-warning fw-bold fst-italic">Mål</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, index) => (
            <tr
              key={row.player.id}
              onClick={() => navigate(`/player/${row.player.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td className="text-center fw-bold text-secondary">
                {index + 1}
              </td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={row.player.imageUrl}
                    alt={row.player.name}
                    className="rounded-circle border border-light"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="player-name-link fw-semibold">
                    {row.player.name}
                  </span>
                </div>
              </td>
              <td className="text-center fw-bold text-warning fs-5 fst-italic">
                {row.goals}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
