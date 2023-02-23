import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Card } from "react-bootstrap";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Card
      bg="light"
      style={{
        width: "90%",
        marginTop: "50px",
        margin: "auto auto",
        maxWidth: "50rem",
      }}
    >
      <Card.Body>
        <h1 style={{ fontSize: "60px" }}>Daily Grind!</h1>
        <Card.Subtitle>Ponder the questions</Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "5px" }}>
          What are you grateful for today?
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "5px" }}>
          What are your affirmations to yourself?
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "5px" }}>
          What are your goals for the day?
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "5px" }}>
          What are your wellness goals today?
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "5px" }}>
          What are your thoughts?
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Ground yourself by journaling everyday!
        </Card.Subtitle>
        <button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Log In" : "Sign Up Now"}
        </button>
        {showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </Card.Body>
    </Card>
  );
}
