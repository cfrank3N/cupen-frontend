import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { authorizedFetch } from "../utility.js";
import { API_URL } from "../config.js";

const emptyPlayer = {
  name: "",
  city: "",
  imageUrl:
    "https://res.cloudinary.com/drrwrnzjk/image/upload/q_auto/f_auto/v1778501418/standard-player_rhgbal.avif",
};

export default function CreatePlayers() {
  const [players, setPlayers] = useState([{ ...emptyPlayer }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (index, field, value) => {
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === index ? { ...player, [field]: value } : player,
      ),
    );
  };

  const addPlayer = () => setPlayers((prev) => [...prev, { ...emptyPlayer }]);

  const removePlayer = (index) => {
    if (players.length === 1) return;
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = players.map((p) => ({
        ...p,
        pricemoney: parseInt(p.pricemoney) || 0,
        rating: parseInt(p.rating) || 0,
      }));

      await authorizedFetch(`${API_URL}/api/players`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccess(`${players.length} player(s) created!`);
      setPlayers([{ ...emptyPlayer }]);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setError("You are not authorized to do this.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-warning fw-bold fst-italic mb-4">SKAPA SPELARE</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <Card key={index} className="mb-3 bg-body-tertiary border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold text-warning">
                  Spelare {index + 1}
                </span>
                {players.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removePlayer(index)}
                  >
                    Ta bort
                  </Button>
                )}
              </div>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Control
                    placeholder="Namn"
                    value={player.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Stad"
                    value={player.city}
                    onChange={(e) =>
                      handleChange(index, "city", e.target.value)
                    }
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Bild URL"
                    value={player.imageUrl}
                    onChange={(e) =>
                      handleChange(index, "imageUrl", e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex gap-2 mt-2">
          <Button variant="outline-warning" onClick={addPlayer}>
            + Lägg till spelare
          </Button>
          <Button variant="warning" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Skapa spelare"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
