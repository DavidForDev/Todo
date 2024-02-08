const { buildSchema } = require("graphql");

// =========== All Schema ========== \\
const {
  accountMutationSchema,
  accountQuerySchema,
  accountSchema,
} = require("./account.schema");

const {
  taskMutationSchema,
  taskQuerySchema,
  taskSchema,
} = require("./task.schema");

const Schema = `

    ${accountSchema}
    ${taskSchema}

    type RootQuery {
        ${accountQuerySchema}
        ${taskQuerySchema}
    }

    type RootMutation {
        ${accountMutationSchema}
        ${taskMutationSchema}
    }

    schema {
        query: RootQuery 
        mutation: RootMutation
    }
`;

const graphqlSchema = buildSchema(Schema);

module.exports = graphqlSchema;
