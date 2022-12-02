// create attempt code starts here

const express = require('express');
const router = express.Router();
const DailyJournal = require("../../models/dailyjournal")

router.route("/create").post((req, res) => {
    const gratefulFor = req.body.gratefulFor;
    const affirmations = req.body.affirmations;
    const newJournalEntry = new DailyJournal({
        gratefulFor,
        affirmations
    })

    newJournalEntry.save()
})

module.exports = router;

// create attempt code ends here