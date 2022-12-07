import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function MyJournalsPage({user}) {
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
      .get("/journals")
      .then((res) => {
        console.log(res);
        setJournals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteJournal = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
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
    console.log(updatedJournal);

    axios
      .put(`/update/${updatedJournal.id}`, updatedJournal)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>My Journals {user._id} </h1>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a journal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="date"
            name="dateAdded"
            onChange={handleChange}
            value={updatedJournal.dateAdded ? updatedJournal.dateAdded : ""}
          />
          <Form.Control
            placeholder="grateful for"
            name="gratefulFor"
            onChange={handleChange}
            value={updatedJournal.gratefulFor ? updatedJournal.gratefulFor : ""}
          />
          <Form.Control
            placeholder="affirmations"
            name="affirmations"
            onChange={handleChange}
            value={
              updatedJournal.affirmations ? updatedJournal.affirmations : ""
            }
          />
          <Form.Control
            placeholder="goals"
            name="goals"
            onChange={handleChange}
            value={updatedJournal.goals ? updatedJournal.goals : ""}
          />
          <Form.Control
            placeholder="wellness goals"
            name="wellnessGoals"
            onChange={handleChange}
            value={
              updatedJournal.wellnessGoals ? updatedJournal.wellnessGoals : ""
            }
          />
          <Form.Control
            placeholder="daily thoughts"
            name="dailyThoughts"
            onChange={handleChange}
            value={
              updatedJournal.dailyThoughts ? updatedJournal.dailyThoughts : ""
            }
          />
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
              <div
                style={{
                  marginBottom: "1rem",
                  border: "solid lightgray 1px",
                  borderRadius: "8px",
                }}
                key={journal._id}
              >
                <p>{journal.dateAdded}</p>
                <p>{journal.gratefulFor}</p>
                <p>{journal.affirmations}</p>
                <p>{journal.goals}</p>
                <p>{journal.wellnessGoals}</p>
                <p>{journal.dailyThoughts}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    padding: "1rem",
                  }}
                >
                  <Button
                    variant="outline-info"
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
                    style={{ width: "100%", marginRight: "1rem" }}
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deleteJournal(journal._id)}
                    variant="outline-danger"
                    style={{ width: "100%" }}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>

    // <>
    //   <h1>My Journals</h1>
    //   {/* <button onClick={handleCheckToken}>Check When My Login Expires</button> */}
    // </>
  );
}
