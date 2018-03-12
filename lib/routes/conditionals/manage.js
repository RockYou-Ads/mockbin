'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('../../../package.json')

module.exports = function (req, res, next) {
  var self = this
  res.view = 'conditional/manage'

  self.client.keys('conditional:*', function (err, ids) {
    if (err) {
      debug(err)
      throw err
    }

    self.client.multi(
      ids.map(function (id) { return [ 'lrange', id.replace('conditional:', 'log:'), -1, -1 ] })
    ).exec(function (err, replies) {
      if (err) {
        debug(err)
        throw err
      }

      self.client.multi(
        ids.map(function (id) { return [ 'get', id ] })
      ).exec(function (err, entities) {
        if (err) {
          debug(err)
          throw err
        }

        res.body = {
          conditional: {
            version: '1.2',
            creator: {
              name: 'mockbin.com',
              version: pkg.version
            },
            entries: []
          }
        }

        replies.forEach(function (results, index) {
          var items
          var entity = JSON.parse(entities[index])
          var id = ids[index]
          if (results.length) {
            items = results.map(function (str) {
              return Object.assign(JSON.parse(str), { conditional: id,
                                                      entity: entity,
                                                      id: id.replace('conditional:', '')
                                                    })
            })
          } else {
            items = [ { conditional: ids[index], id: ids[index].replace('conditional:', ''), startedDateTime: '<new>' } ]
          }
          res.body.conditional.entries = res.body.conditional.entries.concat(items)
        })

        next()
      })
    })
  })
}
