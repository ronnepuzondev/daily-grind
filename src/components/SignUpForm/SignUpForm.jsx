import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Card, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const disable = formData.password !== formData.confirm;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { confirm, error, ...userData } = formData;
      const user = await signUp(userData);
      props.setUser(user);
      navigate("/journals");
    } catch {
      setFormData({
        ...formData,
        error: 'Sign Up Failed - Try Again'
      });
    }
  };

  return (
    <Card bg="light">
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="123"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Email" className="mb-3">
            <Form.Control
              placeholder="123"
              as="textarea"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Password" className="mb-3">
            <Form.Control
              placeholder="123"
              as="textarea"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Confirm Password" className="mb-3">
            <Form.Control
              placeholder="123"
              as="textarea"
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </Card.Body>
      </Card>
      )
      }