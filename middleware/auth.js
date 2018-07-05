const jwt = require('jsonwebtoken')

module.exports = {
  authenticate: function (req, res, next) {
    let decoded = jwt.verify(req.headers.token, 'secret')
    if (decoded) {
      next()
    } else {
      next('Invalid Token')
    }
  }
}