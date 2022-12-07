const express = require('express');
const router = express.Router();

const journalsCtrl = require('../../controllers/api/journals');

router.post('/create', journalsCtrl.createEntry)

module.exports = router
// router.post("/create").post((req, res) => {
//     const gratefulFor = req.body.gratefulFor;
//     const affirmations = req.body.affirmations;
//     const newJournalEntry = new DailyJournal({
//         gratefulFor,
//         affirmations
//     })

//     newJournalEntry.save()
// })

// module.exports = router;

//create journal entry


// //get all journals
// router.get('/api/items', async (req, res) =>{
//     try {
//         const allJournals = await DailyJournal.find({});res.status(200).json(allJournals)
//     }catch(err){
//         res.json(err)
//     }
// })

// //update item
// router.put('/api/item/:id', async (req,res)=>{
//     try {
//         const updateItem = await DailyJournal.findByIdAndUpdate(req.params.id, {$set: req.body});
//         res.status(200).json('Item Updated')
//     }catch(err){
//         res.json(err)
//     }
// })

// //delete item
// router.delete('/api/item/:id', async (req, res)=>{
//     try{
//         const deleteItem = await DailyJournal.findByIdAndDelete(req.params.id); res.status(200).json('Item Deleted')

//     }catch(err){
//         res.json(err)
//     }
// })


