const path = require('path')
const express = require('express')
const winston = require('winston')
const GraphQLHTTP = require('express-graphql')
const schema = require('./schemas')
const app = express()
const clientPath = path.resolve(__dirname, '../client')

app.use(express.static(clientPath))
app.set('views', clientPath)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/graphiql', GraphQLHTTP({
  schema,
  pretty: true,
  graphiql: true
}))

app.use('*', (req, res, next) => res.render('index.html'))

app.listen(3000, function () {
  winston.info('GraphQL Server running @ port 3000')
})
