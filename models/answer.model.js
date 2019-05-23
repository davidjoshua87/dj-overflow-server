const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const answerSchema = Schema({
    answer: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
