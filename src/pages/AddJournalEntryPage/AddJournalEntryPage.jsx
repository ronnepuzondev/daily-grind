import { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios"

export default function AddJournalEntryPage() {
  const [data, setData] = useState();

  // create attempt code starts here
  const [input, setInput] = useState({
    gratefulFor: "",
    description: "",
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
    event.preventDefault();
    axios
    .post("/create", input)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    
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
            New Quote
          </Button>
        </Card.Footer>
        </Card>
      <div>


      <h1>Add Journal Entry</h1>

      <form>
      <div><input onChange={handleChange} name="gratefulFor" value={input.gratefulFor}></input></div>
      <div><textarea onChange={handleChange} name="affirmations" value={input.affirmations}></textarea></div>
      <button onClick={handleClick}>Add Journal Entries</button>
      </form>
      </div>
      

    </div>
  );
}