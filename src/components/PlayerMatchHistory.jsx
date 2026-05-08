import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import { nonAuthorizedFetch } from "../utility.js";
import { MatchResultVersionTwo } from "./MatchResult";
import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";

export default function PlayerMatchHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await nonAuthorizedFetch(
          `http://localhost:8080/api/statistics/player/${id}/matches`,
        );
        setMatches(data.object || []);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [id]);

  return (
    <>
      <MyNavBar />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            ← Tillbaka
          </Button>
          <h2 className="text-warning fw-bold fst-italic mb-0">ALLA MATCHER</h2>
          <div style={{ width: "100px" }}></div> {/* Spacer for alignment */}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <MatchResultVersionTwo matches={matches} />
        )}
      </Container>
      <MyFooter />
    </>
  );
}
