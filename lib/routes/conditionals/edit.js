'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('../../../package.json')

module.exports = function (req, res, next) {
  res.view = 'conditional/edit'

  this.client.get('conditional:' + req.params.uuid, function (err, data) {
    if (err) {
      console.log('error!', err)
      debug(err)
      throw err
    }

    console.log('success!', JSON.parse(data))

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
