import { Container, Card, Row, Col } from "react-bootstrap";

function LastFiveMatches({ matches }) {
  return (
    <Container className="my-5">
      <Row className="mb-3 border-bottom">
        <h3 className="text-warning fw-bold fst-italic text-center">
          FORM SENASTE 5
        </h3>
      </Row>
      <Row className="d-flex align-items-center justify-content-center">
        {matches.map((match, index) => (
          <Col key={index} xs={2}>
            <Card
              className={`border-0 ${match.result === "WIN"
                  ? "text-bg-success"
                  : match.result === "LOSS"
                    ? "text-bg-danger"
                    : "text-bg-warning"
                }`}
            >
              <Card.Body className="p-0 d-flex align-items-center justify-content-center">
                <span className="fw-bold text-white">
                  {match.result === "WIN"
                    ? "W"
                    : match.result === "LOSS"
                      ? "L"
                      : "D"}
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LastFiveMatches;
