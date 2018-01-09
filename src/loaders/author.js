require('dotenv').config()
const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

const fetchAuthor = id => 
    fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=${process.env.KEY}`)
    .then(response => response.text())
    .then(parseXML)

module.exports = {fetchAuthor}