const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const dailyJournalSchema = new Schema({
    gratefulFor: {type: String},
    affirmations: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps: true
})

module.exports = mongoose.model('DailyJournal', dailyJournalSchema)