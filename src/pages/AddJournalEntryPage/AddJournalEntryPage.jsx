import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import '../AddJournalEntryPage/AddJournalEntryPage.css'

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
    event.preventDefault();
    axios
      .post("/journals/new", input)
      .catch((err) => console.log(err));
    navigate("/journals");
    // window.location.reload()
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
    <main className='AddJournalPage'>
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
    <Card
    bg="light"
      style={{
        alignContent: "center",
        margin: "auto auto",
        maxWidth: "30rem",
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
        <h5 style={{cursor:"grab",marginTop:"10px",fontSize:"14px", textAlign:"center"}} onClick={updateQuote}>click for another quote</h5>
      </Card.Body>
    </Card>

    <Card
       bg="light"
      style={{
        width: "90%",
        marginTop: "20px",
        margin: "auto auto",
        maxWidth: "50rem",
      }}
    >
      <Card.Body>
      <h1 style={{fontSize:"40px"}}>Add Journal Entry</h1>
        <form>
          <input
            type="datetime-local"
            onChange={handleChange}
            name="dateAdded"
            value={input.dateAdded}
            style={{marginBottom:"10px"}}
          ></input>
          <FloatingLabel
            controlId="floatingTextarea"
            label="I am grateful for:"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="gratefulFor"
              placeholder="Leave a comment here"
              onChange={handleChange}
              style={{ height: "100px" }}
              value={input.gratefulFor}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="My daily affirmations:"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="affirmations"
              placeholder="Leave a comment here"
              onChange={handleChange}
              style={{ height: "100px" }}
              value={input.affirmations}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="My goals for today:"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="goals"
              placeholder="Leave a comment here"
              onChange={handleChange}
              style={{ height: "100px" }}
              value={input.goals}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="My wellness goals for today:"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="wellnessGoals"
              placeholder="Leave a comment here"
              onChange={handleChange}
              style={{ height: "100px" }}
              value={input.wellnessGoals}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="My daily thoughts:"
          >
            <Form.Control
              as="textarea"
              name="dailyThoughts"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
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
      </Card.Footer>
    </Card>
      
      
      </div>
      </main>

    
  );
}
