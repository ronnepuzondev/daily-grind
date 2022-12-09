import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from 'react-router-dom'


export default function MyJournalsPage({ user }) {
  const [journals, setJournals] = useState([]);
  const [updatedJournal, setUpdatedJournal] = useState({
    id: "",
    gratefulFor: "",
    affirmations: "",
    goals: "",
    wellnessGoals: "",
    dailyThoughts: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`/journals/${user._id}`)
      .then((res) => {
        setJournals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteJournal = (id) => {
    axios
      .delete(`/journals/${id}`)
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updateJournal = (
    id,
    dateAdded,
    gratefulFor,
    affirmations,
    goals,
    wellnessGoals,
    dailyThoughts
  ) => {
    setUpdatedJournal((prev) => {
      return {
        ...prev,
        id: id,
        dateAdded: dateAdded,
        gratefulFor: gratefulFor,
        affirmations: affirmations,
        goals: goals,
        wellnessGoals: wellnessGoals,
        dailyThoughts: dailyThoughts,
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJournal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedJournal = () => {
    axios
      .put(`/journals/${updatedJournal.id}`, updatedJournal)
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <main className="MyJournalsPage" style={{
      height: "100vh"
    }}>
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1 style={{ marginTop: "10px" }}>{user.name}'s Journals </h1>
      <Link to="/journals/new">Add Journal Entry</Link>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update a journal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="datetime-local"
            name="dateAdded"
            onChange={handleChange}
            value={updatedJournal.dateAdded ? updatedJournal.dateAdded : ""}
          />
          <FloatingLabel
            controlId="floatingTextarea"
            label="I am grateful for.."
            className="mb-3"
          >
            <Form.Control
              placeholder="grateful for"
              name="gratefulFor"
              onChange={handleChange}
              value={
                updatedJournal.gratefulFor ? updatedJournal.gratefulFor : ""
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="My daily affirmations.."
            className="mb-3"
          >
            <Form.Control
              placeholder="affirmations"
              name="affirmations"
              onChange={handleChange}
              value={
                updatedJournal.affirmations ? updatedJournal.affirmations : ""
              }
            />{" "}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="My goals for today.."
            className="mb-3"
          >
            <Form.Control
              placeholder="goals"
              name="goals"
              onChange={handleChange}
              value={updatedJournal.goals ? updatedJournal.goals : ""}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="My wellness goals for today.."
            className="mb-3"
          >
            <Form.Control
              placeholder="wellness goals"
              name="wellnessGoals"
              onChange={handleChange}
              value={
                updatedJournal.wellnessGoals ? updatedJournal.wellnessGoals : ""
              }
            />{" "}
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="My daily thoughts.."
          >
            <Form.Control
              as="textarea"
              placeholder="daily thoughts"
              style={{ height: "300px" }}
              name="dailyThoughts"
              onChange={handleChange}
              value={
                updatedJournal.dailyThoughts ? updatedJournal.dailyThoughts : ""
              }
            />{" "}
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedJournal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {journals ? (
        <>
          {journals.map((journal) => {
            return (
              <Card
                style={{
                  textAlign: "left",
                  margin: "20px auto",
                  maxWidth: "60rem",
                }}
                key={journal._id}
              >
                <Card.Body>
                  <Card.Title className="mb-2">Date Added:</Card.Title>
                  <p>{new Date(journal.dateAdded).toDateString()}</p>
                  <Card.Title className="mb-2">I Am Grateful For:</Card.Title>
                  <p>{journal.gratefulFor}</p>
                  <Card.Title className="mb-2">My Affirmations:</Card.Title>
                  <p>{journal.affirmations}</p>
                  <Card.Title className="mb-2">My Goals Today:</Card.Title>
                  <p>{journal.goals}</p>
                  <Card.Title className="mb-2">
                    My Wellness Goals Today:
                  </Card.Title>
                  <p>{journal.wellnessGoals}</p>
                  <Card.Title className="mb-2">My Thoughts Today:</Card.Title>
                  <p>{journal.dailyThoughts}</p>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="dark"
                    onClick={() =>
                      updateJournal(
                        journal._id,
                        journal.dateAdded,
                        journal.gratefulFor,
                        journal.affirmations,
                        journal.goals,
                        journal.wellnessGoals,
                        journal.dailyThoughts
                      )
                    }
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deleteJournal(journal._id)}
                    variant="secondary"
                  >
                    DELETE
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
      </main>
  );
}
