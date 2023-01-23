const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const indexRoute = require("./index");

// =========== graphql files ==========\\
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

// =========== middlware ========== \\
app.use(bodyParser.json());
app.use(cors());
app.use("/", indexRoute);

app.use(
  "/",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: false,
  })
);

// =========== connect to Mongoose =========== \\

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log("//=========== Mongoose Connected... =========== \\");
      console.log("//=========== server start on 4000 PORT =========== \\");
    });
  })
  .catch((err) => console.log(err));
