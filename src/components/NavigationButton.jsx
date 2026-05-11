import { Button, Row, Container, Col } from "react-bootstrap";

export default function NavigationButtons({
  buttonOneText,
  buttonTwoText,
  uriOne,
  uriTwo,
}) {
  return (
    <Container className="mt-5">
      <Row className="d-flex justtify-content-between align-items-center">
        <Col xs={6}>
          <Button href={uriOne} variant="outline-warning" type="button">
            {buttonOneText}
          </Button>
        </Col>
        <Col xs={6} className="text-end">
          <Button href={uriTwo} variant="outline-warning" type="button">
            {buttonTwoText}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
