const router = require('express').Router()

let keystore = require('../models/keystore')
let errorHandler = require('./handlers/error')

/****************************
Method: GET
Endpoint: /object/mykey
Response: {"value": value1 }
****************************/
router.get('/object/:key', function(req, res) {
  let timestamp = req.query.timestamp
  let key = req.params.key

  if (!timestamp) {
    timestamp = Date.now() / 1000
  }
  if (isNaN(timestamp)){
    return errorHandler.invalidInputHandler(res)
  }

	keystore.getKey(key, timestamp).then(result => {
    if (result) {
      let response = {
        value: result.value
      }
      return res.json(response)
    }
    else {
      return res.send('There isn\'t a key set before this timestamp.')
    }
  })
  .catch(err => {
    return errorHandler.unexpectedErrorHandler(res)
  })
})

/****************************
Method: POST
Endpoint: /object
Body: JSON: {mykey : value2}
Response: {"key":"mykey", "value":"value2", "timestamp": time } //Where time is timestamp of the new value (6.05pm) .
****************************/
router.post('/object', function(req, res) {
  let key = Object.keys(req.body)[0]

  if (!key || !req.body[key]) {
    return errorHandler.invalidInputHandler(res)
  }

  keystore.setKey(key, req.body[key]).then(result => {
    return res.json(result)
  })
  .catch(err => {
    return errorHandler.unexpectedErrorHandler(res)
  })
})

module.exports = router
