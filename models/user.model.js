const mongoose   = require('mongoose')
const Schema     = mongoose.Schema
const bcrypt     = require('bcryptjs')
const saltRounds = 10

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username has been taken. Please enter another username']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Please use other email address']
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}).pre('save', function () {
    let user = this
    let hash = bcrypt.hashSync(user.password, saltRounds)
    user.password = hash
})

const User = mongoose.model('User', userSchema)
module.exports = User