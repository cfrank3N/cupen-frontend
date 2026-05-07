import { Container, Card, Row } from "react-bootstrap";

function LastFiveMatches({ matches }) {
  return (
    <Container>
      <Row>
        {matches.map((match, index) => (
          <Col key={index} xs={12}>
            <Card
              className="border-0"
              bg={
                match.result === "WIN"
                  ? "success"
                  : match.result === "LOSS"
                    ? "danger"
                    : "warning"
              }
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
