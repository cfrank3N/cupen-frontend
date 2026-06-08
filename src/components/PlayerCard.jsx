import { Col, Row, Card, Container } from "react-bootstrap";

function PlayerCard({ rating, playerImage, playerName, playedMatches }) {
  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col xs={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fst-italic text-secondary">Rating</span>
              <h1 className="fw-bold fst-italic text-secondary text-end">{rating}</h1>
            </Card.Header>
            <Card.Img className="mx-auto my-2 d-block w-75" variant="top" alt="Card image" src={playerImage} />
            <Card.Body className="border-top">
              <Card.Title>
                <h1 className="text-center fw-bold">{playerName}</h1>
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-center fst-italic">
              Spelade matcher: {playedMatches}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PlayerCard;
