import express from "express";
import bodyParser from "body-parser";
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers/auth');

const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(bodyParser.json());

// Allow cross-origin
app.use(cors());

//app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: async ({ req }) => {

    }
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.de0ji.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Server is running on localhost:3000");
  })
  .catch((err) => {
    console.log(err);
  });
