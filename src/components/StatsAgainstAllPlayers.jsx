import { Container, Table } from "react-bootstrap";

function StatsAgainstAllPlayers({ versusStats }) {
  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        MOTSTÅNDARHISTORIK
      </h4>
      <Table striped hover className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Motståndare</th>
            <th>M</th>
            <th>%</th>
            <th>MS</th>
          </tr>
        </thead>
        <tbody>
          {versusStats.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.playerName}</td>
              <td>{item.playedMatches}</td>
              <td>{item.winPercentage}</td>
              <td>{item.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StatsAgainstAllPlayers;
