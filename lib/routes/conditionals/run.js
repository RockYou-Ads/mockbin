'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('./../../../package')

function getPort () {
  return process.env.MOCKBIN_PORT || pkg.config.port
}

module.exports = function (req, res, next) {
  var loginfo = { condition: undefined }

  function getSearch (field, key) {
    // get the data from the field in question
    switch (field) {
      case 'header': return req.get(key)
      case 'cookie': return req.cookies[key]
      case 'body': return req.body
      case 'full url': return req.protocol + '://' + req.get('host') + req.originalUrl
      case 'protocol': return req.protocol
      case 'domain': return req.hostname
      case 'url path': return req.path
      case 'port': return getPort()
      case 'request type': return req.method
      case 'parameter': return req.query[key]
    }
    return ''
  }

  function createQuery (type, query) {
    var matches
    var reg = ''

    try {
      switch (type) {
        case 'regex':
          matches = query.match(/^\/(.*)\/([a-z])$/)
          reg = new RegExp(matches[1], matches[2])
          break
        case 'contains':
          reg = new RegExp(query, 'i')
          break
        case 'starts with':
          reg = new RegExp('^' + query, 'i')
          break
        case 'ends with':
          reg = new RegExp(query + '$', 'i')
          break
        case 'exact':
          reg = new RegExp('^' + query + '$', 'i')
          break
        case 'less than':
          reg = (function (value) { return function (field) { return parseFloat(field) < value } })(parseFloat(query))
          break
        case 'greater than':
          reg = (function (value) { return function (field) { return parseFloat(field) > value } })(parseFloat(query))
          break
        case 'one of':
          reg = new RegExp(query.replace(/,/g, '|'), 'i')
          break
      }
    } catch (e) { console.log('Error', type, query, e.stack) }
    return reg
  }

  function resolve (query, search) {
    if (typeof query === 'function') {
      return query(search) === true
    }
    return (search + '').search(query) >= 0
  }

  this.client.get('conditional:' + req.params.uuid, function (err, value) {
    if (err) {
      debug(err)

      throw err
    }

    /*
    {
      conditionals: [ { field: { type: '',key: ''}, match : { type: ,expression } }],
      defaults: [ { name:, value: } ],
      locked: false,
      description: undefined
      // {name,value?}, match {type,value}, target {url}
    }
    */

    if (value) {
      var cond = JSON.parse(value)
      var endpoint = '/conditional/:uuid:' // this needs to be a setting somewhere
      var tests = cond.conditionals
      var passed = false
      var test
      var query
      var search

      for (var j = 0, lj = tests.length; j < lj; j++) {
        test = tests[j]
        var expected = !test.match.negate
        search = getSearch(test.field.type, test.field.key)
        if (!search) continue
        query = createQuery(test.match.type, test.match.expression)
        if (resolve(query, search) === expected) {
          passed = true
          break
        }
      }

      if (passed) {
        endpoint = test.targetUrl
        loginfo.condition = {
          redir: endpoint, field: test.field, match: test.match, search: search
        }
      } else if (cond.defaults[0].name === 'targetUrl') {
        endpoint = cond.defaults[0].targetUrl
        loginfo.condition = { redir: endpoint, query: 'default' }
      } else {
        endpoint = undefined
        loginfo.condition = { redir: 404 }
      }

      // log interaction & send the appropriate response based on HAR
      this.client.lpush('log:' + req.params.uuid, JSON.stringify(Object.assign(loginfo, req.har.log.entries[0])))
      this.client.ltrim('log:' + req.params.uuid, 0, 100)

      if (endpoint) {
        // just redirect
        res.redirect(302, endpoint)
      } else {
        // return 404
        res.status(404)
          .send('Not found')
          .end()
      }
      return
    }
    next()
  }.bind(this))
}
