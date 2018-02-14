'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('../../../package.json')
var util = require('util')

module.exports = function (req, res, next) {
  var conditionals

  // check for full HAR
  if (req.jsonBody && req.jsonBody.response) {
    conditionals = req.jsonBody.response
  }

  // exception for the web Form
  // TODO eliminate this and rely on req.simple.postData.text
  if (req.simple.postData.params && req.simple.postData.params.response) {
    try {
      conditionals = JSON.parse(req.simple.postData.params.response)
    } catch (e) {
      debug(e)
    }
  }

  // overwritten by application/x-www-form-urlencoded or multipart/form-data
  if (req.simple.postData.text) {
    try {
      conditionals = JSON.parse(req.simple.postData.text)
    } catch (e) {
      debug(e)
    }
  }

  // set the new data
  // reload the page

  this.client.set('conditional:' + req.params.uuid, JSON.stringify(conditionals))

  res.view = 'redirect'
  res.status(201).location(util.format('/conditional/%s/edit', req.params.uuid)).body = {
    // duped code
    bin: {
      version: '1.2',
      creator: {
        name: 'mockbin.com',
        version: pkg.version
      },
      id: req.params.uuid,
      entry: conditionals
    }
  }
  next()
}
