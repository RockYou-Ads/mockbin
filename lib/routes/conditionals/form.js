'use strict'

module.exports = function (req, res, next) {
  res.view = 'conditional/create'

  next()
}
