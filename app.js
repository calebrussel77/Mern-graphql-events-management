const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

app.use(cors());
app.use(express.json());

const events = [];
const users = [
  {
    _id: "argdhgtghd246836",
    name: "caleb russel",
  },
  {
    _id: "argdhgtghd246836",
    name: "Jane doe",
  },
];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    type User {
        _id: ID!
        name: String!
    }

    type RootEvent {
        events: [Event!]!
        users:[User!]!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String
    }

    type RootQuery {
        events: RootEvent
    }

    type RootMutation {
        createEvent(eventInput : EventInput): Event
    }
        schema { 
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //The resolvers
    rootValue: {
      events: () => {
        return { events: events, users: users };
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random.toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString(),
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
    pretty: true,
  })
);

app.get("/", (req, resp) => {
  resp.send("hello");
});

app.listen(3000);
