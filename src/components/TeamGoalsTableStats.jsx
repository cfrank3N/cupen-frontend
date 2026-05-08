import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

export default function TeamGoalsTableStats({ stats }) {
  const navigate = useNavigate();

  // Guard clause for loading or empty states
  if (!stats || !stats.object || stats.object.length === 0) {
    return (
      <Container className="my-5 text-center text-secondary">
        Laddar målstatistik...
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        LAGMÅLSTABELLEN
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
            <th className="text-center">Totala Mål</th>
            <th className="text-center text-warning fw-bold fst-italic">
              Snitt
            </th>
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
              <td className="text-center">{row.goals}</td>
              <td className="text-center fw-bold text-warning fst-italic">
                {row.averageGoals.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
