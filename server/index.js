const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// ========== Requires
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();

// ========== app use
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// ---- Graphql
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolver/index");

app.use(
  "/",
  graphqlHTTP({
    graphiql: false,
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
  })
);

// ============ Listen to server
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected on the PORT: ${process.env.PORT}`);
    });
    console.log("connected to mongodb");
  })
  .catch((err) => {
    throw err;
  });
