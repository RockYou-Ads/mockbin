'use strict'

var debug = require('debug-log')('mockbin')

module.exports = function (req, res, next) {
  this.client.get('conditional:' + req.params.uuid, function (err, value) {
    if (err) {
      debug(err)

      throw err
    }

    if (value) {
      var har = JSON.parse(value)

      res.view = 'conditional/view'
      res.body = har
    }

    next()
  })
}
