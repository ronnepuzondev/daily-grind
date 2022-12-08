import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Card, Form, FloatingLabel } from 'react-bootstrap';


export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // Update user state with user
      this.props.setUser(user);
    } catch {
      // Invalid signup
      this.setState({
        error: 'Sign Up Failed - Try Again'
      });
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <Card><Card.Body>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
          <FloatingLabel
              controlId="floatingTextarea"
              label="Name"
              className="mb-3"
            >
            <Form.Control as="textarea" placeholder="123" type="text" name="name" value={this.state.name} onChange={this.handleChange} required /> 
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Email"
              className="mb-3"
            >
            <Form.Control placeholder="123" as="textarea" type="email" name="email" value={this.state.email} onChange={this.handleChange} required /></FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Password"
              className="mb-3"
            >
            <Form.Control placeholder="123" as="textarea" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Confirm Password"
              className="mb-3"
            >
            <Form.Control placeholder="123" as="textarea" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required /> </FloatingLabel>
            <button type="submit" disabled={disable}>SIGN UP</button>
        {/* <p className="error-message">&nbsp;{this.state.error}</p> */}
        
        </form>
        </Card.Body>
        </Card>
    )
  }
}