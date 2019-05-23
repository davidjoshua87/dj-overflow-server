const express = require('express')
const index   = express.Router()

index.get('/', (req, res) => {
    res.send('already to connect server')
})

module.exports = index