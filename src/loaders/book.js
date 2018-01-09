require('dotenv').config()
const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

const fetchBook = id =>
fetch(`https://www.goodreads.com/book/show/${id}.xml?key=${process.env.KEY}`)
  .then(response => response.text())
  .then(parseXML)

module.exports = {fetchBook}