const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./user')


const dailyJournalSchema = new Schema({
    dateAdded: {type: Date},
    gratefulFor: {type: String},
    affirmations: {type: String},
    goals: {type: String},
    wellnessGoals: {type: String},
    dailyThoughts: {type: String},
    // user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('DailyJournal', dailyJournalSchema)