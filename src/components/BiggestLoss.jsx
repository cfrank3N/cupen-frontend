import { MatchResultNoList } from "./MatchResult";
import { Container } from "react-bootstrap";

function BiggestLoss({ match }) {
  return (
    <Container className="my-4 border border-danger rounded py-3">
      <h4 className="fw-bold text-center text-warning fst-italic">
        STÖRSTA FÖRLUSTEN
      </h4>
      <MatchResultNoList match={match} />
    </Container>
  );
}

export default BiggestLoss;
