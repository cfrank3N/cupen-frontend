import { Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormerTeams({ teams }) {
  const navigate = useNavigate();
  return (
    <Container className="my-5">
      <h4 className="mb-4 text-warning fw-bold fst-italic text-center">
        FÖREDETTA LAG
      </h4>
      <Table striped hover className="mb-0">
        <thead>
          <tr>
            <th>År</th>
            <th>Lag</th>
            <th>V</th>
            <th>O</th>
            <th>F</th>
            <th>MS</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.tournamentYear}</td>
              <td>
                {team.players.map((player, playerIndex) => (
                  <span key={player.id}>
                    <span
                      onClick={() => navigate(`/player/${player.id}`)}
                      className="text-primary-hover"
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline transparent",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                      (e.target.style.textDecoration =
                        "underline transparent")
                      }
                    >
                      {player.name}
                    </span>
                    {playerIndex < team.players.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{`${team.scoredGoals} - ${team.concededGoals}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default FormerTeams;
