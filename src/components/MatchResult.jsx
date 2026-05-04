import { Card, Col, Row } from "react-bootstrap";

function MatchResult({ matches }) {
  return (
    <Row>
      {matches.map((match, index) => (
        <Card key={index} className="mb-3 shadow-sm bg-body-tertiary">
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

export default MatchResult;
