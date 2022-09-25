import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
  hello: () => {
    return "Hello world!";
  },
};

export function applyMiddleware() {
  return graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  });
}
