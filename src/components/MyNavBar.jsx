import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown, Col } from "react-bootstrap";

export default function MyNavBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container className="sm-6">
        <Col className="d-flex justify-content-left align-items-center">
          <Navbar.Brand href="/">Cupen</Navbar.Brand>
        </Col>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Statistik" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Skytteligan</NavDropdown.Item>
              <NavDropdown.Item href="/">Målligan(Lag)</NavDropdown.Item>
              <NavDropdown.Item href="/">Maratontabellen</NavDropdown.Item>
              <NavDropdown.Item href="/">Totaltabellen</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">Spelare</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
