import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginStatus("");

    try {
      const result = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await result.json();
      const message = data.message;

      if (!result.ok) {
        setLoginStatus(message);
      }

      const jwt = data.object;

      localStorage.setItem("jwt", jwt);
    } catch (err) {
      console.log("Login failed", err);
      setLoginStatus("Login failed catastrophically");
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-cemter">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Form.Text className="text-muted">{loginStatus}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
