import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

export function TotalTableStats({ stats }) {
  const navigate = useNavigate();

  if (!stats || !stats.object || stats.object.length === 0) {
    return (
      <Container className="my-5 text-center text-secondary">
        Laddar marathontabell...
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        TOTALTABELLEN
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
            <th className="text-center">SM</th>
            <th className="text-center">V</th>
            <th className="text-center">O</th>
            <th className="text-center">F</th>
            <th className="text-center">MS</th>
            <th className="text-center text-warning fw-bold fst-italic">P</th>
          </tr>
        </thead>
        <tbody>
          {stats.object.map((row, index) => (
            <tr key={row.player.id}>
              <td className="text-center fw-bold text-secondary">
                {index + 1}
              </td>
              <td>
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => navigate(`/player/${row.player.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={row.player.imageUrl}
                    alt=""
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
              <td className="text-center">{row.playedMatches}</td>
              <td className="text-center">{row.wonMatches}</td>
              <td className="text-center">{row.drawnMatches}</td>
              <td className="text-center">{row.lostMatches}</td>
              <td className="text-center text-secondary">
                {row.goalDifference}
              </td>
              <td className="text-center fw-bold text-warning fst-italic">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
