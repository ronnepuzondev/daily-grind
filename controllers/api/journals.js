const DailyJournal = require('../../models/dailyjournal');


module.exports = {
    createEntry,
    display
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
    async function display(req, res) {
        try {
            DailyJournal.find({user:req.params.id}).sort({dateAdded: -1})
            .then((items) => res.json(items))
            .catch((err) => console.log(err));
            
        } catch {
            res.status(400).json('Oops');
        }
    
        }
           
       