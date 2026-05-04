import { Col, Row, Container } from "react-bootstrap";
import HomePageButton from "./HomePageButton";

function HomePageBanner() {
  return (
    <Container>
      <Row>
        <small className="text-warning mb-1">SÄSONG 2026</small>
        <h1 className="fw-bold">
          FÖLJ <span className="text-warning fst-italic">CUPEN</span>
        </h1>
        <h1 className="fw-bold">LIVE</h1>
      </Row>
      <Row>
        <p className="text-secondary">
          All statistik, alla matcher, alla spelare - samlat på ett ställe
        </p>
      </Row>
      <HomePageButton content="Utforska statistik" />
    </Container>
  );
}

export default HomePageBanner;
