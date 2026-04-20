import { Container, Image } from "react-bootstrap";

export default function MyFooter() {
  return (
    <footer className="py-4 mt-5">
      <Container bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <hr />
        <div className="d-flex justify-content-between mt-4 text-secondary">
          <a href="/contact" className="text-secondary">Contact us</a>
          <a href="/" className="text-secondary">Home</a>
          <div>
            <a className="text-secondary" href="/">Spelare</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
