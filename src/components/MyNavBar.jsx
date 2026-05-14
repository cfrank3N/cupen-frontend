import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown, Col } from "react-bootstrap";

export default function MyNavBar() {
  const isLoggedIn = !!sessionStorage.getItem("jwt");

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container className="sm-6">
        <Col className="d-flex justify-content-left align-items-center">
          <Navbar.Brand href="/">Cupen</Navbar.Brand>
        </Col>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Statistik" id="basic-nav-dropdown">
              <NavDropdown.Item href="/statistics/playergoals">
                Skytteligan
              </NavDropdown.Item>
              <NavDropdown.Item href="/statistics/teamgoals">
                Målligan(Lag)
              </NavDropdown.Item>
              <NavDropdown.Item href="/statistics/totaltable">
                Totaltabellen
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/player">Spelare</Nav.Link>

            {isLoggedIn && (
              <NavDropdown
                title={<span className="text-warning">Admin</span>}
                id="admin-nav-dropdown"
              >
                <NavDropdown.Item href="/admin/create-tournament">
                  Create Tournament
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/manage-events">
                  Manage Events
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/create-players">
                  Create Players
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/create-teams">
                  Create Teams
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/create-matches">
                  Create Matches
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
