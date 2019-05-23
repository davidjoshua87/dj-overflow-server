const express        = require('express')
const users          = express.Router()
const userController = require('../controllers/user.controller')
const {
    authenticate
} = require('../middleware/auth')

users.get('/', userController.getAll)
users.post('/', userController.create)
users.post('/login', userController.login)
users.post('/check', userController.check)

module.exports = users