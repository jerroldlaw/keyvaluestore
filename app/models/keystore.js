let db = require('../config/db.js')

let getKey = (key, timestamp) => {
  return new Promise((resolve, reject) => {
    let getKeyQuery = "\
      SELECT key, value, extract(epoch from timestamp) \
      AS timestamp FROM keys \
      WHERE key=$1 and extract(epoch from timestamp) <= $2 \
      ORDER BY timestamp DESC limit 1"

    db.oneOrNone(getKeyQuery, [key, timestamp])
      .then(value => {
        resolve(value)
      })
      .catch(error => {
        reject(error)
      })
  })
}

let setKey = (key, value) => {
  return new Promise((resolve, reject) => {
    let setKeyQuery = "\
    INSERT INTO keys VALUES($1, $2) \
    RETURNING key, value, extract(epoch from timestamp) AS timestamp"

    db.one(setKeyQuery, [key, value])
      .then(value => {
        resolve(value)
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = {
  getKey: getKey,
  setKey: setKey
}
