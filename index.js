require('dotenv').config()

const fs = require('fs')
const path = require('path')

const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { buildSubgraphSchema } = require('@apollo/federation')

const resolvers = require('./resolvers')
const context = require('./context')

const { SECURITY = 'public' } = process.env

const SCHEMA_PATH = path.join(__dirname, SECURITY === 'private' ? './private-schema.gql' : './public-schema.gql')
const schema = fs.readFileSync(SCHEMA_PATH).toString('utf-8')

const server = new ApolloServer({
  schema: buildSubgraphSchema([{
    typeDefs: gql(schema),
    resolvers
  }]),
  context,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
