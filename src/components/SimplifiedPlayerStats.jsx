import { Container, Table } from "react-bootstrap";

export function SimplifiedPlayerStats({ stats }) {
  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        TOTAL STATISTIK
      </h4>
      <Table striped hover className="mb-0">
        <thead>
          <tr>
            <th>SM</th>
            <th>V</th>
            <th>O</th>
            <th>F</th>
            <th>MS</th>
            <th>Titles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.playedMatches}</td>
            <td>{stats.wonMatches}</td>
            <td>{stats.drawnMatches}</td>
            <td>{stats.lostMatches}</td>
            <td>{stats.goalDifference}</td>
            <td>{stats.titles}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
