import { Card, Container, Table, Spinner, Alert } from "react-bootstrap";
import { nonAuthorizedFetch } from "../utility";
import { useState, useEffect } from "react";

function PlayerGoalsTable() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await nonAuthorizedFetch(
          "http://localhost:8080/api/statistics/goals",
        );

        setStats(data.object);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Spinner animation="border" className="m-5" />;
  }
  if (error) {
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-warning fw-bold fst-italic">SKYTTELIGAN</h2>
      <Card className="rounded-3 overflow-hidden border border-warning shadow-sm">
        {" "}
        <Table striped hover className="mb-0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Spelare</th>
              <th>Mål</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item, index) => (
              <tr key={item.player.id}>
                <td>{index + 1}</td>
                <td>{item.player.name}</td>
                <td className="text-center fw-bold fst-italic text-warning">
                  {item.goals}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default PlayerGoalsTable;
