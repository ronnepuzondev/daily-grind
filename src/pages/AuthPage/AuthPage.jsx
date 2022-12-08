import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Card, Form, FloatingLabel } from 'react-bootstrap';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Card style={{ width: "90%", marginTop: "50px", margin: "auto auto", maxWidth: "40rem" }}><Card.Body>
  
      <h1>Daily Grind</h1>
      <Card.Subtitle>
        Ground yourself by journaling everyday!
      </Card.Subtitle>
      <Card.Subtitle style={{marginTop:"5px"}}>
        Write what you're grateful for today..
      </Card.Subtitle>
      <Card.Subtitle style={{marginTop:"5px"}}>
        Write your daily affirmations..
      </Card.Subtitle>
      <Card.Subtitle style={{marginTop:"5px"}}>
        Write your daily goals..
      </Card.Subtitle>
      <Card.Subtitle style={{marginTop:"5px"}}>
        Write your daily wellness goals..
      </Card.Subtitle>
      <Card.Subtitle style={{marginTop:"5px"}}>
        And more importantly, write your daily thoughts!
      </Card.Subtitle>
      <button style={{marginTop:"10px", marginBottom:"10px"}} onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up Now'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
</Card.Body>
    </Card>
  );
}