import { Card, Col, Row } from "react-bootstrap";

function MatchResult({ matches }) {
  return (
    <Row className="mx-0">
      {matches.map((match, index) => (
        <Card key={index} className="border-0 mb-3 shadow-sm bg-body-tertiary">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6}>
                <span className="fw-semibold">{match.teamA}</span>{" "}
                <span className="text-secondary">vs</span>{" "}
                <span className="fw-semibold">{match.teamB}</span>
              </Col>
              <Col md={2} className="text-center">
                <span className="fw-bold fs-4 text-warning">{match.score}</span>
              </Col>
              <Col md={4} className="text-end">
                <div className="text-warning fw-semibold">{match.group}</div>
                <div className="text-secondary">{match.date}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}

export function MatchResultNoList({ match }) {
  if (!match) {
    return (
      <div className="text-center p-4 bg-body-tertiary rounded shadow-sm border border-secondary border-opacity-25">
        <p className="text-secondary mb-0 fst-italic">
          Inga registrerade matcher här än
        </p>
      </div>
    );
  }

  const dateObj = new Date(match.playedAt);

  const formattedDate = dateObj.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateObj.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getTeamNames = (team) => {
    return team.players.map((p) => p.name).join(", ");
  };

  return (
    <Card className="border-0 mb-3 shadow-sm bg-body-tertiary">
      <Card.Body>
        <Row>
          <Col className="text-start">
            <div className="text-secondary small">
              {formattedDate} : {formattedTime}
            </div>
          </Col>
          <Col className="text-end">
            <div className="text-warning fw-semibold">{match.matchType}</div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={5}>
            <span className="fw-semibold">
              {getTeamNames(match.teamA)}
            </span>{" "}
          </Col>
          <Col xs={2} className="text-center">
            <span className="fw-bold fs-4 text-warning">{match.score}</span>
          </Col>
          <Col xs={5} className="text-end">
            <span className="fw-semibold">{getTeamNames(match.teamB)}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export function MatchResultVersionTwo({ matches }) {
  if (!matches || matches.length === 0) {
    return <MatchResultNoList match={null} />;
  }

  return (
    <div className="match-list">
      {matches.map((m, index) => (
        <MatchResultNoList key={m.id || index} match={m} />
      ))}
    </div>
  );
}

export default MatchResult;
