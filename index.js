require('dotenv').config()

const fs = require('fs');
const path = require('path');

const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const resolvers = require('./resolvers');
const context = require('./context');
const { buildSubgraphSchema } = require('@apollo/federation');
const schema = fs.readFileSync(path.join(__dirname, './private-schema.gql')).toString('utf-8');

const server = new ApolloServer({
  schema: buildSubgraphSchema([{
    typeDefs: gql(schema),
    resolvers,
  }]),
  context,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
