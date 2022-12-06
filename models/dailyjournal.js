const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const dailyJournalSchema = new Schema({
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