const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    scalar Date

        type Msg {
            msg: String
        }
        type Booking {
            _id: ID!
            eventId: Event!
            userId : User!
            createdAt: Date
            updateAt: Date
        }
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            createdAt: Date
            createdBy: User!
        }
        type User {
            _id: ID!
            name: String!
            email: String!
            password: String
            createdEvents: [Event!]
        }
        
        type AuthResponse {
            userId: ID!
            token: String!
            totkenExpiration: Int!
        }

    input UserInput {
        name: String! 
        email: String! 
        password: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        createdAt: Date
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        users: [User!]!
        login(email: String!, password:String!) : AuthResponse
    }
    type RootMutation {
        createEvent(eventInput : EventInput): Event
        createUser(userInput : UserInput): User
        bookEvent(eventId : ID!): Booking!
        cancelBooking(bookingId : ID!): Msg
    }
        schema { 
            query: RootQuery
            mutation: RootMutation
        }
    `);
