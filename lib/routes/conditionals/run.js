'use strict'

var debug = require('debug-log')('mockbin')
var pkg = require('./../../../package')

function getPort() {
  return process.env.MOCKBIN_PORT || pkg.config.port
}

module.exports = function (req, res, next) {
  var self = this
  function getSearch(field, key) {
    // get the data from the field in question
console.log(field,key)
    switch(field) {
      case 'header': return req.get(key);
      case 'cookie': return req.cookies[key];
      case 'body': return req.body;
      case 'full url': return req.protocol + '://' + req.get('host') + req.originalUrl;
      case 'protocol': return req.protocol;
      case 'domain': return req.hostname;
      case 'url path': return req.path;
      case 'port': return getPort();
      case 'request type': return req.method;
      case 'parameter': return req.query[key];
    }
    return ""
  }

  function createQuery(type, query) {
    var matches, reg = '';
    // ['regex','contains','starts with','ends with','exact','less than','greater than','one of']
//console.log('CreateQuery --------------------------')
//console.log(type,query)
    try {
      switch(type) {
        case 'regex':
          matches = query.match(/^\/(.*)\/([a-z])$/)
          reg = new RegExp(matches[1],matches[2])
          break;
        case 'contains':
          reg = new RegExp(query,'i')
          break;
        case 'starts with':
          reg = new RegExp('^'+query,'i')
          break;
        case 'ends with':
          reg = new RegExp(query+'$','i')
          break;
        case 'exact':
          reg = new RegExp('^'+query+'$','i')
          break;
        case 'less than':
          reg = (function(value) { return function(field) { return parseFloat(field) < value } })(parseFloat(query))
          break;
        case 'greater than':
          reg = (function(value) { return function(field) { return parseFloat(field) > value } })(parseFloat(query))
          break;
        case 'one of':
          reg = new RegExp(query.replace(/,/g,'|'),'i')
          break;
      }
    } catch (e) { console.log( "Error", type, query, e.stack)}
    return reg
  }

  function resolve(query,search) {
    if( typeof query === "function" ) {
      return query(search) == true
    }
console.log( query, typeof search, search )
    return (search+"").search(query) >= 0
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

      // log interaction & send the appropriate response based on HAR
      this.client.rpush('log:' + req.params.uuid, JSON.stringify(req.har.log.entries[0]))
      this.client.ltrim('log:' + req.params.uuid, 0, 100)

      var endpoint = "/conditional/:uuid:" // this needs to be a setting somewhere
      var tests = cond.conditionals,
          test = undefined,
          passed = false
      for (var j=0, lj=tests.length; j<lj; j++) {
        test = tests[j]
        var search = getSearch(test.field.type, test.field.key )
        if( !search ) continue
        var query = createQuery(test.match.type, test.match.expression),
            expected = test.match.neg !== "true"; // TODO: Add negate logic
console.log('Search key',test.field.type, test.field.key,search,query)
        if(resolve(query, search) == expected) {
console.log(test.field, test.match, test.targetUrl)
          passed = true
          break;
        }
      }
      if( passed ) {
        endpoint = test.targetUrl // ???
      } else if( cond.defaults[0].name == "targetUrl" ) {
        endpoint = cond.defaults[0].targetUrl // ???
      } else {
        endpoint = undefined
      }

      if( endpoint ) {
        // just redirect
console.log("*** Redirect ***",endpoint)
        res.redirect(302, endpoint);
      } else {
        // return 404
        res.status(404)
           .send("Not found")
           .end()
      }
      return
    }
    next()
  }.bind(this))
}
