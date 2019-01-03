let pgp = require('pg-promise')()
pgp.pg.defaults.ssl = true;

const dbConString = process.env.DATABASE_URL
const db = pgp(dbConString)

module.exports = db
