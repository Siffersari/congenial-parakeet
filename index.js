const { PubSub, GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

mongoose.connect('mongodb://localhost/miniChat', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const pubsub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

mongoose.connection.once('open', () =>
  server.start(() => console.log('We make magic over at localhost:4000'))
);
