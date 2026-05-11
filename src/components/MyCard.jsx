import { Col, Row, Card, Container } from "react-bootstrap";

function MyCard({ stats }) {
  return (
    <Container>
      <Row>
        {stats.map(({ num, label }) => (
          <Col xs={8} sm={6} md={4} key={label}>
            <Card border="warning" className="stats text-center">
              <Card.Body>
                <Card.Title className="fst-italic fw-bold fs-1 text-warning">
                  {num}
                </Card.Title>
                <Card.Text className="text-secondary fw-semibold">
                  {label}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyCard;
