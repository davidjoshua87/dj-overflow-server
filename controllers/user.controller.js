const User   = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

module.exports = {
    create: function (req, res) {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            .then(user => {
                let token = jwt.sign({
                    username: user.username,
                    id: user._id
                }, 'secret')
                res.status(200).json({
                    message: 'New user created',
                    // user,
                    token
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Unable to create user',
                    err
                })
            })
    },
    getAll: function (req, res) {
        User.find()
            .exec()
            .then(users => {
                res.status(200).json({
                    message: 'All users retrieved',
                    users
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Unable to retrieve users data'
                })
            })
    },
    login: function (req, res) {
        User.findOne({
                username: req.body.username,
            })
            .exec()
            .then(profile => {
                let username = req.body.username
                let password = req.body.password
                let check = bcrypt.compareSync(password, profile.password)
                if (check) {
                    let token = jwt.sign({
                        username: profile.username,
                        id: profile._id
                    }, 'secret')
                    res.status(200).json({
                        message: 'Authentication sucess',
                        token
                    })
                } else {
                    res.status(401).json({
                        message: 'Wrong Password'
                    })
                }
            })
            .catch(err => {
                res.status(404).json({
                    message: "User not found, make sure you've registered",
                    err
                })
            })
    },
    check: function (req, res) {
        let decoded = jwt.decode(req.headers.token, 'secret')
        if (decoded) {
            res.status(200).json({
                message: 'decoded successfully',
                userId: decoded.id
            })
        } else {
            res.status(400).json({
                message: 'unable to decode'
            })
        }
    }
}
