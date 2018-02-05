'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('../../../package.json')
var util = require('util')

module.exports = function (req, res, next) {
  res.view = 'bin/edit'
  this.client.get('bin:' + req.params.uuid, function (err, data) {
    if (err) {
      debug(err)
      throw err
    }

    res.body = {
      bin: {
        version: '1.2',
        creator: {
          name: 'mockbin.com',
          version: pkg.version
        },
        id: req.params.uuid,
        entry: JSON.parse(data)
      }
    }

    next()
  })
}
