const express = require('express');
const path = require('path');

// import apollo server for graphql
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers for our ApolloServer
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// function to start ApolloServer
const startServer = async () => {
  // create new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // Start ApolloServer
  await server.start();

  // intigrate our Apollo server with Express Application as middle ware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);

};

// initialize apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// code to serve production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// catch all for unknown requests
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
