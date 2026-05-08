import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "⚽",
    title: "Skytteligan",
    desc: "Se vem som leder målskytteligan.",
    path: "/statistics/playergoals",
  },
  {
    icon: "📊",
    title: "Totaltabellen",
    desc: "Den historiska rankningen av alla spelare.",
    path: "/statistics/totaltable",
  },
  {
    icon: "👤",
    title: "Spelarstatistik",
    desc: "Djupdyk i en spelares hela karriär och head-to-head.",
    path: "/player",
  },
];

function FeatureCards() {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="g-3">
        {features.map(({ icon, title, desc, path }) => (
          <Col key={title} md={4}>
            <Card
              className="h-100 border-0 rounded-3 bg-body-tertiary shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(path)}
            >
              <Card.Body className="p-3">
                <div className="mb-3 fs-4">{icon}</div>
                <Card.Title className="fw-bold text-white">{title}</Card.Title>
                <Card.Text className="text-secondary">{desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeatureCards;
