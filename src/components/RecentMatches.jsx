import MatchResult from "./MatchResult";
import { Container } from "react-bootstrap";

function RecentMatches({ matches }) {
  return (
    <Container className="my-4 border-top border-bottom border-secondary py-3">
      <h3 className="fw-bold">SENASTE MATCHER</h3>
      <MatchResult matches={matches} />
    </Container>
  );
}

export default RecentMatches;
