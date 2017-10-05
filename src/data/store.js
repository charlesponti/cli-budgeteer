require('dotenv').config()

const path = require('path')

const datastore = require('@google-cloud/datastore')({
  projectId: process.env.DATASTORE_PROJECT_ID,
  keyFilename: path.resolve(__dirname, '../../keyfile.json')
})

module.exports = datastore
