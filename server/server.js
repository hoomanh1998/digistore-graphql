require("dotenv").config();
const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { tokenValidation } = require("./util");

async function startApolloServer() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      const tokenWithBearer = req.headers["authorization"];
      const token = tokenWithBearer && tokenWithBearer.split(" ")[1];
      const user = tokenValidation(token);
      return { user };
    },
  });

  app.get("/", (_, res) => {
    res.redirect("/graphql");
  });

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
}

startApolloServer();
