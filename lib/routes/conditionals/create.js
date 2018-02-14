'use strict'

var debug = require('debug-log')('mockbin')
var util = require('util')
var uuid = require('node-uuid')
var validate = require('har-validator')

module.exports = function (req, res, next) {
  var conditional = req.jsonBody

  console.log(req.jsonBody)
  console.log(conditional)

  /*
  response = {
    conditionals: [],
    defaults: [],
    locked: false,
    description: undefined
  }
  */

  // check for full HAR
  if (req.jsonBody && req.jsonBody.response) {
    conditional = req.jsonBody.response
  }

  // exception for the web Form
  // TODO eliminate this and rely on req.simple.postData.text
  if (req.simple.postData.params && req.simple.postData.params.response) {
    try {
      conditional = JSON.parse(req.simple.postData.params.response)
    } catch (e) {
      debug(e)
    }
  }

  // need to validate the conditional
  // check the syntax, etc
  // the regex will need to be unescaped (it becomes double encoded)

  var id = uuid.v4()
  this.client.set('conditional:' + id, JSON.stringify(conditional))

  res.view = 'redirect'
  res.status(201).location(util.format('/conditional/%s/edit', id)).body = id

  next()
}
