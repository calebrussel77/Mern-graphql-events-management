const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const graphqlRootSchema = require("./graphql/schema");
const graphqlRootResolvers = require("./graphql/resolvers");
const checkAuth = require("./middlewares/checkAuth");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
//check is Auth
app.use(checkAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlRootSchema,
    //The resolvers
    rootValue: graphqlRootResolvers,
    graphiql: true,
    pretty: true,
  })
);

app.get("/", (req, resp) => {
  resp.send("hello");
});

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is Connected SUCCESSFUL !");
    app.listen(process.env.PORT || "4000");
  })
  .catch((err) => {
    console.log(err);
  });
