require('dotenv').config()
const express = require('express')
const app = express()
const graphqlHttp = require('express-graphql')
const { PORT } = process.env
const {fetchAuthor} = require('./loaders/author')
const {fetchBook} = require('./loaders/book')
const schema = require('./schema')
const DataLoader = require('dataloader')

app.use('/graphql', graphqlHttp(req => {
  const authorLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchAuthor)))

  const bookLoader = new DataLoader(keys =>
      Promise.all(keys.map(fetchBook)))

  return {
    schema,
    context: {authorLoader, bookLoader},
    graphiql: true
  }
}))

app.listen(PORT)
console.log(`Listening on ${process.env.PORT}`)
