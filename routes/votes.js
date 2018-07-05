const express = require('express')
const votes = express.Router()

votes.get('/', (req, res) => {
  res.send('connected')
})

module.exports = votes