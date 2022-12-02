const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyJournalSchema = new Schema({
    gratefulFor: {type: String},
    affirmations: {type: String}
})

module.exports = mongoose.model('DailyJournal', dailyJournalSchema)