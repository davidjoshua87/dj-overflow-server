const express = require('express')
const answers = express.Router()
const answerController = require('../controllers/answer.controller')
const { authenticate } = require('../middleware/auth')

answers.post('/:id', authenticate, answerController.create)
answers.get('/', answerController.getAll)
answers.delete('/:id', answerController.remove)
answers.get('/:ans/upvote/:user', answerController.upvote)
answers.get('/:ans/downvote/:user', answerController.downvote)
module.exports = answers