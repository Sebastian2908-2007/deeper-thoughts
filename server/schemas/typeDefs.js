// i;mport tagged template gql function
const { gql } = require('apollo-server-express');

// create our typeDefs
// All type definitions need to specify what type of data is expected in return, no matter what.
const typeDefs = gql`
type Thought {

    _id: ID

    thoughtText: String

    createdAt: String

    username: String

    reactionCount: Int

    reactions: [Reaction]
}

type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
}

type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
}

type Query {
    users: [User]

    user(username: String!): User

    thoughts(username: String): [Thought]

    thought(_id: ID!): Thought
}
`;

module.exports = typeDefs;