const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const questionSchema = Schema({
    title: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
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

const Question = mongoose.model('Question', questionSchema)
module.exports = Question