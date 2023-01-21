const { buildSchema } = require("graphql");
const {
  accountSchema,
  accountRootMutation,
  accountRootQuery,
} = require("./account.schema");
const {
  collectionSchema,
  collectionRootMutation,
  collectionRootQuery,
} = require("./collection.schema");

const ExportSchema = `

type ActionMessage {
  message: String!
  type: String!
}

${accountSchema}
${collectionSchema}

type RootQuery {
    ${accountRootQuery}
    ${collectionRootQuery}
}

type RootMutation {
    ${accountRootMutation}
    ${collectionRootMutation}
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`;

module.exports = buildSchema(ExportSchema);
