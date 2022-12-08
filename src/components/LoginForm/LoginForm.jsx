import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { Form, FloatingLabel, Card } from "react-bootstrap";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <Card>
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              placeholder="123"
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />{" "}
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              placeholder="123"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />{" "}
          </FloatingLabel>
          <button type="submit">LOG IN</button>
        </form>
        <p className="error-message">&nbsp;{error}</p>
      </Card.Body>
    </Card>
  );
}
