import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios"
import Form from 'react-bootstrap/Form';


export default function AddJournalEntryPage({user}) {
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
    user: ""
  })

  function handleChange(event) {
    const {name, value} = event.target;
    setInput(prevInput => {
      return {
        ...prevInput, [name]: value
      }
    })
  }

  function handleClick(event) {
    console.log({user})
    event.preventDefault();
    axios
    .post("/create", input)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

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
    <div className="App">
      <Card style={{ width: "90%", maxWidth: "40rem" }}>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title">{data.author}</cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={updateQuote}>
            Inspire me!
          </Button>
        </Card.Footer>
        </Card>
      


      <h1>Add Journal Entry {user.name} </h1>

      <form>
      <div><input type="date" onChange={handleChange} name="dateAdded" value={input.dateAdded}></input></div>
      <div><input onChange={handleChange} name="gratefulFor" value={input.gratefulFor}></input></div>
      <div><textarea onChange={handleChange} name="affirmations" value={input.affirmations}></textarea></div>
      <div><textarea onChange={handleChange} name="goals" value={input.goals}></textarea></div>
      <div><textarea onChange={handleChange} name="wellnessGoals" value={input.wellnessGoals}></textarea></div>
      <div><textarea onChange={handleChange} name="dailyThoughts" value={input.dailyThoughts}></textarea></div>
      <button onClick={handleClick}>Add Journal Entries</button>
      </form>
      
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
    </Form>
      

    </div>
  );
}