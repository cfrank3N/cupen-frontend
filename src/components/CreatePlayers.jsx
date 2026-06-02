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
  pricemoney: "",
  rating: "",
  image: null, 
};

export default function CreatePlayers() {
  const [players, setPlayers] = useState([{ ...emptyPlayer }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (index, field, value) => {
    setPlayers((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    );
  };

  const addPlayer = () =>
    setPlayers((prev) => [...prev, { ...emptyPlayer }]);

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
      for (const p of players) {
        const formData = new FormData();

        formData.append("name", p.name);
        formData.append("city", p.city);
        formData.append("pricemoney", p.pricemoney || 0);
        formData.append("rating", p.rating || 0);

        if (p.image) {
          formData.append("image", p.image);
        }

        await authorizedFetch(`${API_URL}/api/players`, {
          method: "POST",
          body: formData,
        });
      }

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
      <h2 className="text-warning fw-bold fst-italic mb-4">
        SKAPA SPELARE
      </h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <Card key={index} className="mb-3 bg-body-tertiary border-0">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
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
                    placeholder="Pris"
                    value={player.pricemoney}
                    onChange={(e) =>
                      handleChange(index, "pricemoney", e.target.value)
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Control
                    placeholder="Rating"
                    value={player.rating}
                    onChange={(e) =>
                      handleChange(index, "rating", e.target.value)
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      handleChange(index, "image", e.target.files[0])
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
