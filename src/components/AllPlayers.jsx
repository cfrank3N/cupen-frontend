import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { nonAuthorizedFetch } from "../utility.js";
import { API_URL } from "../config.js";

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await nonAuthorizedFetch(
          `${API_URL}/api/statistics/players`,
        );
        setPlayers(data.object || []);
      } catch (err) {
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-warning fw-bold fst-italic mb-4 text-center">
        SPELARE
      </h2>
      <Row className="g-4">
        {players.map((player) => (
          <Col key={player.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100 border-0 shadow-sm bg-dark text-white player-card"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => navigate(`/player/${player.id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Img
                variant="top"
                src={player.imageUrl}
                alt={player.name}
                className="object-fit-contain"
                style={{
                  height: "250px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Card.Body className="text-center border-top border-warning">
                <Card.Title className="fw-bold mb-1">{player.name}</Card.Title>
                <Card.Text className="text-secondary small">
                  {player.city}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllPlayers;
