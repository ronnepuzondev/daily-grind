import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function AddJournalEntryPage({ user }) {
  const navigate = useNavigate();
  const [data, setData] = useState();

  // create attempt code starts here
  const [input, setInput] = useState({
    dateAdded: "",
    gratefulFor: "",
    affirmations: "",
    goals: "",
    wellnessGoals: "",
    dailyThoughts: "",
    user: `${user._id}`,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    console.log({ user });
    event.preventDefault();
    axios
      .post("/journals/new", input)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/journals");
  }
  // create attempt code ends here
  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }

  // Run `updateQuote` once when component mounts
  useEffect(() => {
    updateQuote();
  }, []);

  // Do not render until the first quote is loaded
  if (!data) return null;

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <Card
        style={{
          alignContent: "center",
          margin: "auto auto",
          width: "90%",
          maxWidth: "40rem",
        }}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {" "}
            {user.name}, here's a quote for inspiration!
          </Card.Subtitle>
          <blockquote className="blockquote mb-0">
            <p>{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title">{data.author}</cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
      </Card>

      <Card
        style={{
          width: "90%",
          marginTop: "20px",
          margin: "auto auto",
          maxWidth: "40rem",
        }}
      >
        <Card.Body>
          <Card.Title>Add Journal Entry</Card.Title>
          <form>
            <input
              type="date"
              onChange={handleChange}
              name="dateAdded"
              value={input.dateAdded}
            ></input>
            <FloatingLabel
              controlId="floatingTextarea"
              label="I am grateful for.."
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="gratefulFor"
                placeholder="Leave a comment here"
                onChange={handleChange}
                value={input.gratefulFor}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="My daily affirmations.."
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="affirmations"
                placeholder="Leave a comment here"
                onChange={handleChange}
                value={input.affirmations}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="My goals for today.."
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="goals"
                placeholder="Leave a comment here"
                onChange={handleChange}
                value={input.goals}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="My wellness goals for today.."
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="wellnessGoals"
                placeholder="Leave a comment here"
                onChange={handleChange}
                value={input.wellnessGoals}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="My daily thoughts.."
            >
              <Form.Control
                as="textarea"
                name="dailyThoughts"
                placeholder="Leave a comment here"
                style={{ height: "200px" }}
                onChange={handleChange}
                value={input.dailyThoughts}
              />
            </FloatingLabel>
          </form>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleClick} variant="dark" type="submit">
            Add Journal
          </Button>
          <Button variant="secondary" onClick={updateQuote}>
            Need More Inspiration
          </Button>
        </Card.Footer>
      </Card>
      {/* <form>
        <div>
          <input
            type="date"
            onChange={handleChange}
            name="dateAdded"
            value={input.dateAdded}
          ></input>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="gratefulFor"
            value={input.gratefulFor}
          ></input>
        </div>
        <div>
          <textarea
            onChange={handleChange}
            name="affirmations"
            value={input.affirmations}
          ></textarea>
        </div>
        <div>
          <textarea
            onChange={handleChange}
            name="goals"
            value={input.goals}
          ></textarea>
        </div>
        <div>
          <textarea
            onChange={handleChange}
            name="wellnessGoals"
            value={input.wellnessGoals}
          ></textarea>
        </div>
        <div>
          <textarea
            onChange={handleChange}
            name="dailyThoughts"
            value={input.dailyThoughts}
          ></textarea>
        </div>
        <button onClick={handleClick}>Add Journal Entries</button>
      </form> */
      /* <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of entry</Form.Label>
        <Form.Control type="date" name="dateAdded"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */}
    </div>
  );
}
