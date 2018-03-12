'use strict'

var debug = require('debug-log')('mockbin')

module.exports = function (req, res, next) {
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
      for (var i=0, li=cond.length; i<li; i++) {
        var tests = cond[i],
            test = undefined
            passed = true
        for (var j=0, lj=tests.length; j<lj; j++) {
          test = tests[j]
          var search = getSearch(test.field, test.ke )
              query = createQuery(test.type, test.query),
              check = not ? checkNeg : checkPos;
          if(!check(query, search)) {
            passed = false
            break;
          }
        }
        if( passed ) {
          endpoint = endpoint.replace( ':uuid:', test.bin )
        }
      }
    }

    next()
  }.bind(this))
}
