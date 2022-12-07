const DailyJournal = require('../../models/dailyjournal');


module.exports = {
    createEntry,
  };

async function createEntry(req, res) {
    try {
        const newNote = await new DailyJournal(req.body)
        newNote
        .save()
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err))
        
    } catch {
        res.status(400).json('Oops');
    }

    }
       