import { Container, Image } from "react-bootstrap";

export default function MyFooter() {
  return (
    <footer className="py-2">
      <Container bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <hr />
        <div className="d-flex justify-content-between mt-4 text-secondary">
          <a href="/" className="text-secondary">
            Contact us
          </a>
          <a href="/" className="text-secondary">
            Home
          </a>
          <div>
            <a className="text-secondary" href="/admin/login">
              Admin
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
