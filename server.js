const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

process.env.NODE_ENV == 'test' ? dotenv.config({path: '.env.test'}) : dotenv.config({path: '.env'})
let port = process.env.PORT || 3000

app.use(bodyParser.json())
/* API Routes */
var routes   = require('./app/routes')
app.use('/', routes)

app.listen(port, () => console.log(`Vault key store app listening on port ${port}!`))

module.exports = app
