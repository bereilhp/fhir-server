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
    name: [Name!]!
    telecom: [Telecom!]!
    address: [Address!]!
    maritalStatus: MaritalStatus
    communication: [Communication!]!
    managingOrganization: ManagingOrganization
  }

  type Identifier {
    system: String!
    value: String!
  }

  type Name {
    use: String
    family: String
    given: [String]
  }

  type Telecom {
    system: String!
    value: String!
    use: String
  }

  type Address {
    use: String!
    line: [String!]!
    city: String!
    state: String!
    postalCode: String!
    country: String!
  }

  type Coding {
    system: String!
    code: String!
    display: String
  }

  type MaritalStatus {
    coding: [Coding!]!
  }

  type Language {
    coding: [Coding!]!
    text: String!
  }

  type Communication {
    language: Language!
    preferred: Boolean
  }

  type Reference {
    reference: String!
  }

  type ManagingOrganization {
    reference: String!
  }

  type Query {
    patients: [Patient!]!
  }

  type Organization {
    _id: ID
    resourceType: String!
    identifier: [Identifier!]!
    active: Boolean
    type: [CodeableConcept!]!
    name: String!
    alias: [String!]
    description: String
    contact: [ExtendedContactDetail!]!
    partOf: Reference
    endpoint: [Reference!]!
    qualification: [Qualification!]!
  }

  type ExtendedContactDetail {
    name: String!
    telecom: [Telecom!]!
  }

  type Qualification {
    identifier: [Identifier!]!
    code: CodeableConcept!
    status: CodeableConcept!
    period: Period!
    issuer: Reference!
  }

  type Period {
    start: String!
    end: String
  }

  type CodeableConcept {
    coding: [Coding!]!
    text: String
  }

  type Coding {
    system: String!
    code: String!
    display: String
  }

  type Query {
    patients: [Patient!]!
    organizations: [Organization!]!
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

    organizations: async () => {
      try {
        const db = await connectToDatabase();
        const collection = db.collection("organizations");
        return collection.find().toArray();
      } catch (error) {
        console.error("Error fetching organizations:", error);
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
