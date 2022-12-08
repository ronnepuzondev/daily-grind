const DailyJournal = require("../../models/dailyjournal");

module.exports = {
  createEntry,
  display,
  deleteJournal,
  updateEntry,
};

async function createEntry(req, res) {
  try {
    const newNote = await new DailyJournal(req.body);
    newNote
      .save()
      .catch((err) => console.log(err));
  } catch {
    res.status(400).json("Oops");
  }
}
async function display(req, res) {
  try {
    DailyJournal.find({ user: req.params.id })
      .sort({ dateAdded: -1 })
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  } catch {
    res.status(400).json("Oops");
  }
}

async function deleteJournal(req, res) {
  try {
    DailyJournal.findByIdAndDelete({ _id: req.params.id })
      .catch((err) => console.log(err));
  } catch {
    res.status(400).json("Oops");
  }
}

async function updateEntry(req, res) {
  try {
    DailyJournal.findByIdAndUpdate(
      { _id: req.params.id },
      {
        dateAdded: req.body.dateAdded,
        gratefulFor: req.body.gratefulFor,
        affirmations: req.body.affirmations,
        goals: req.body.goals,
        wellnessGoals: req.body.wellnessGoals,
        dailyThoughts: req.body.dailyThoughts,
      }
    )
      .catch((err) => console.log(err));
  } catch {
    res.status(400).json("Oops");
  }
}
