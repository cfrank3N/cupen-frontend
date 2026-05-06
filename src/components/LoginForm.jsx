import { Button, Form, Container } from "react-bootstrap";

function LoginForm() {
  return (
    <Container className="my-5 d-flex justify-content-center align-items-cemter">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="username" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
