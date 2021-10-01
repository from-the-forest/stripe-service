const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const resolvers = require('./resolvers');
const context = require('./context');
const typeDefs = fs.readFileSync(path.join(__dirname, './schema.gql')).toString('utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
