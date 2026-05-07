import { MatchResultNoList } from "./MatchResult";
import { Container } from "react-bootstrap";

function BiggestWin({ match }) {
  return (
    <Container className="my-4 border border-success rounded py-3">
      <h4 className="fw-bold text-center text-warning fst-italic">
        STÖRSTA VINSTEN
      </h4>
      <MatchResultNoList match={match} />
    </Container>
  );
}

export default BiggestWin;
