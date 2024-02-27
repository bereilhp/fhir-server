const { ApolloServer, gql } = require("apollo-server");
const { connectToDatabase } = require("../db/connectAtlas");

const typeDefs = gql`
  type Patient {
    _id: ID
    resourceType: String!
    identifier: [Identifier!]!
    active: Boolean
    gender: String!
    birthDate: String!
  }

  type Identifier {
    system: String!
    value: String!
  }

  type Query {
    patients: [Patient!]!
  }
`;

const resolvers = {
  Query: {
    patients: async () => {
      try {
        const db = await connectToDatabase();
        const collection = db.collection("patients");
        return collection.find().toArray();
      } catch (error) {
        console.error("Error fetching patients:", error);
        throw new Error("Internal server error");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});